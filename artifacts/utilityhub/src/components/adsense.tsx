import React, { useEffect, useState } from 'react';

interface AdSenseProps {
  adSlot?: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

export default function AdSense({
  adSlot = 'default-slot',
  adFormat = 'auto',
  className = '',
}: AdSenseProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (import.meta.env.PROD) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }
  }, [isClient]);

  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-XXXXXXXXXXXX';

  if (!import.meta.env.PROD) {
    return (
      <div className={`w-full max-w-6xl mx-auto my-6 p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl text-center space-y-1.5 flex flex-col justify-center min-h-[90px] select-none ${className}`}>
        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">Sponsored Advertisement Slot</span>
        <span className="text-xs font-mono text-zinc-450 dark:text-zinc-500">
          AdSense Client ID: {publisherId} | Slot ID: {adSlot}
        </span>
      </div>
    );
  }

  if (!isClient) return null;

  return (
    <div className={`w-full max-w-6xl mx-auto my-6 overflow-hidden min-h-[90px] flex justify-center items-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '90px' }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
