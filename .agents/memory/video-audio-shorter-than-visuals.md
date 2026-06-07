---
name: Video voiceover shorter than visual timeline
description: Why the promo video narration "repeats from start" mid-playback, and the rule to prevent it
---

In the video-js artifacts (e.g. `utilityhub-video`), a single composite voiceover
`<audio>` track is scene-synced via an `AUDIO_CUE_SEC` map: each scene optionally
seeks the audio to a cue point, then calls `audio.play()`.

**Rule:** when the audio track is shorter than the total visual timeline, never call
`audio.play()` on an element that has already `ended` without first seeking it —
the browser restarts an ended `HTMLAudioElement` **from 0**. Guard it:
`if (audio.ended && targetTime === undefined) return;` (after the optional seek).

**Why:** demo/visual-only scenes have no cue, so they let the audio play forward.
Once the track ends partway through the demos, the next cue-less scene's `play()`
call replayed the narration from the very beginning — perceived by the user as
"the video repeats from start at slide N". Seeking (value/outro/intro-on-loop)
clears the `ended` flag, so cued scenes resume/loop correctly.

**How to apply:** any time you add scenes that extend the visual runtime beyond the
audio length, either extend/loop the audio deliberately or keep this ended-guard so
narration doesn't audibly restart mid-video.
