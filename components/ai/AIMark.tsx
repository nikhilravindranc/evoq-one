"use client";

import { useId } from "react";
import Image from "next/image";

/** The EVOQ AI symbol: an open gradient ring with a sparkle in the gap. */
export function AIMark({ size = 20 }: { size?: number; stroke?: string; className?: string }) {
  const id = useId();
  const ringId = `ai-ring-${id}`;
  const sparkId = `ai-spark-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={ringId} x1="2" y1="3" x2="19" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#000099" />
          <stop offset="55%" stopColor="#4747E0" />
          <stop offset="100%" stopColor="#5C5CFF" />
        </linearGradient>
        <linearGradient id={sparkId} x1="13" y1="2" x2="21" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4747E0" />
          <stop offset="100%" stopColor="#5C5CFF" />
        </linearGradient>
      </defs>
      <path d="M17.6 8.2A8 8 0 1 0 18 16.2" stroke={`url(#${ringId})`} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M17 3l1.1 2.9L21 7l-2.9 1.1L17 11l-1.1-2.9L13 7l2.9-1.1z" fill={`url(#${sparkId})`} />
    </svg>
  );
}

/** Rounded-square app-icon badge — the real EVOQ AI logo asset. */
export function AIBadge({ size = 96 }: { size?: number }) {
  return (
    <Image
      src="/ai/ai-logo-icon.png"
      alt="EVOQ AI"
      width={size}
      height={size}
      priority
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: size * 0.22,
        boxShadow: "0 20px 50px -18px rgba(92,92,255,0.55)",
      }}
    />
  );
}
