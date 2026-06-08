import React, { useEffect, useState } from 'react';

interface AdSenseProps {
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const PUBLISHER_ID = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || '';
const DEFAULT_SLOT = import.meta.env.VITE_ADSENSE_SLOT_ID || '';

let scriptInjected = false;

function ensureAdSenseScript(publisherId: string) {
  if (scriptInjected || typeof document === 'undefined') return;
  if (document.querySelector('script[src*="adsbygoogle.js"]')) {
    scriptInjected = true;
    return;
  }
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
  script.crossOrigin = 'anonymous';
  script.setAttribute('data-adsense-loader', 'true');
  document.head.appendChild(script);
  scriptInjected = true;
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  className = '',
}: AdSenseProps) {
  const [isClient, setIsClient] = useState(false);
  const slot = adSlot || DEFAULT_SLOT;
  const configured = Boolean(PUBLISHER_ID && slot);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !import.meta.env.PROD || !configured) return;
    ensureAdSenseScript(PUBLISHER_ID);
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense initialization error:', err);
    }
  }, [isClient, configured]);

  // Development preview placeholder
  if (!import.meta.env.PROD) {
    return (
      <div className={`w-full max-w-6xl mx-auto my-6 p-4 bg-stone-100 dark:bg-zinc-950 border border-stone-200/60 dark:border-zinc-800/80 rounded-2xl text-center space-y-1.5 flex flex-col justify-center min-h-[90px] select-none ${className}`}>
        <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 dark:text-zinc-500">Sponsored Advertisement Slot</span>
        <span className="text-xs font-mono text-stone-500 dark:text-zinc-500">
          {configured
            ? `Client: ${PUBLISHER_ID} | Slot: ${slot}`
            : 'AdSense not configured — add Publisher ID & Slot ID to go live'}
        </span>
      </div>
    );
  }

  // In production but credentials missing — render nothing
  if (!isClient || !configured) return null;

  return (
    <div className={`w-full max-w-6xl mx-auto my-6 overflow-hidden min-h-[90px] flex justify-center items-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '90px' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
