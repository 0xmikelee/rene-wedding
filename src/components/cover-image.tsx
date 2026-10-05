type CoverImageProps = {
  mobileSrc: string;
  desktopSrc: string;
  alt: string;
  className?: string;
};

/** Full-bleed photo that swaps crops between the mobile and desktop frames. */
export function CoverImage({
  mobileSrc,
  desktopSrc,
  alt,
  className = "object-center",
}: CoverImageProps) {
  return (
    <picture className="pointer-events-none absolute inset-0">
      <source media="(min-width: 1024px)" srcSet={desktopSrc} />
      <img
        src={mobileSrc}
        alt={alt}
        className={`size-full max-w-none object-cover ${className}`}
      />
    </picture>
  );
}
