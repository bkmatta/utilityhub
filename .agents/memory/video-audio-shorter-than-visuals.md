---
name: Video voiceover timing — overlap and shorter-than-visuals pitfalls
description: How the video-js composite voiceover is built, why narration overlaps/restarts, and the rules to keep it aligned
---

In video-js artifacts (e.g. `utilityhub-video`), a single scene-synced `<audio>`
plays `public/audio/composite_audio.mp3`. The composite is built by ffmpeg
`adelay`-ing each scene's individual VO clip to that scene's CUMULATIVE visual
start offset (see the video-js `references/audio.md` "Multi-layer export parity"
section). Per-scene `<audio src>` swaps are discouraged — they drift in recorded
MP4 exports — so keep one composite. `AUDIO_CUE_SEC` in `VideoTemplate.tsx` seeks
the element per scene and MUST equal those cumulative offsets.

**Overlap rule:** every narrated scene's visual duration must be >= its VO clip
length + ~400ms buffer. If a VO clip is longer than its slide, the next scene's
VO (delayed to the next slide's start) overlaps it — and the overlap is baked
into composite_audio.mp3, so no cue change fixes it. Fix by lengthening the
slide in `SCENE_DURATIONS` (or shortening the VO) and rebuilding the composite.
**Why:** intro line was 6.03s in a 4.5s slide → audible double-voice at slide 2.

**Shorter-than-visuals rule:** keep the composite length >= total visual runtime.
If visuals outrun the audio (e.g. silent demo scenes appended), calling
`audio.play()` on an already-`ended` element restarts it FROM ZERO — perceived as
"the video repeats from the start at slide N". Guard it:
`if (audio.ended && targetTime === undefined) return;` (after the optional seek).
Cued scenes (value/outro/intro-on-loop) seek first, which clears `ended`.

**How to apply:** ffprobe each `vo_*.mp3` and compare to its slide duration before
trusting the timeline. Any time you change scene lengths or add/remove narrated
scenes, regenerate the composite AND update `SCENE_DURATIONS` + `AUDIO_CUE_SEC`
together as one atomic change. Demo/visual-only scenes get no cue (silent stretch).
