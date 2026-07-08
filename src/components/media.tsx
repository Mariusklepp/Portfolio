/** Shared photo/video primitives for the About hub and the pursuit detail
 *  pages — one filmic grade everywhere so personal media reads as one set. */

export const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src)

export const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/** Cohesive filmic finish over a photo/video: bottom sink + grain. No color
 *  wash — photos keep their natural tones (a red tint read as pink; removed
 *  on Marius's request). */
export function GradeOverlay() {
  return (
    <>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.5), transparent 45%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.08, mixBlendMode: 'overlay', backgroundImage: GRAIN_URL, backgroundSize: '140px 140px', pointerEvents: 'none' }} />
    </>
  )
}

export function MediaFrame({ src, alt }: Readonly<{ src: string; alt: string }>) {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  }

  if (isVideo(src)) {
    return (
      <video
        key={src}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
        style={baseStyle}
      />
    )
  }

  return <img key={src} src={src} alt={alt} style={baseStyle} />
}
