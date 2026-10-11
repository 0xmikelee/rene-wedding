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
  className = "",
}: CoverImageProps) {
  const frame = `pointer-events-none absolute inset-0 size-full max-w-none object-cover ${className}`;

  return (
    <>
      <img
        src={mobileSrc}
        alt={alt}
        className={`${frame} object-bottom lg:hidden`}
      />
      <img
        src={desktopSrc}
        alt=""
        className={`${frame} object-center hidden lg:block`}
      />
    </>
  );
}
