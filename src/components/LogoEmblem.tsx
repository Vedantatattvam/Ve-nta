import React from "react";
import logoPng from "../assets/logo.png";

interface LogoEmblemProps {
  className?: string;
  size?: number;
  alt?: string;
}

export default function LogoEmblem({
  className = "w-20 h-20",
  size,
  alt = "vedāntatattvaṁ Sacred Logo"
}: LogoEmblemProps) {
  return (
    <img
      src={logoPng}
      alt={alt}
      className={`object-contain select-none inline-block ${className}`}
      style={size ? { width: size, height: size } : undefined}
      referrerPolicy="no-referrer"
      onError={(e) => {
        const target = e.currentTarget;
        if (!target.dataset.fallbackAttempted) {
          target.dataset.fallbackAttempted = "true";
          target.src = "/logo.svg";
        }
      }}
    />
  );
}
