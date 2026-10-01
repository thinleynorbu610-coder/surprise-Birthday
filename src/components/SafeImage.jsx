import { useState } from "react";
import { Heart } from "lucide-react";

// Shows a pretty placeholder if the photo file is missing.
// bloom: photo starts black & white; color spreads out from the pointer on
// hover (inside a .bloom-host) or when `lit` is true (e.g. after a tap).
export default function SafeImage({ src, alt = "", className = "", eager = false, bloom = false, lit = false }) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt || "Photo placeholder"}
        className={`flex items-center justify-center bg-gradient-to-br from-burgundy/60 via-[#1b0d14] to-black text-rose/60 ${className}`}
      >
        <Heart size={28} strokeWidth={1.2} />
      </div>
    );
  }
  const loading = eager ? "eager" : "lazy";
  if (!bloom) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  // Start the color from wherever the finger / cursor touched the photo.
  const setOrigin = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--bx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--by", `${e.clientY - r.top}px`);
  };

  return (
    <span
      className={`bloom relative block overflow-hidden ${className}`}
      data-lit={lit}
      onPointerEnter={setOrigin}
      onPointerDown={setOrigin}
    >
      <img src={src} alt="" aria-hidden loading={loading} decoding="async" onError={() => setFailed(true)}
        className="bloom-base absolute inset-0 h-full w-full object-cover" />
      <img src={src} alt={alt} loading={loading} decoding="async"
        className="bloom-color absolute inset-0 h-full w-full object-cover" />
    </span>
  );
}
