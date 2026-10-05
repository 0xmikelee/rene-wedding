import { CoverImage } from "@/components/cover-image";

export function ClosingPhoto() {
  return (
    <section aria-label="Rene and Arthur walking between cypress trees" className="relative h-[408px] overflow-hidden lg:h-[656px]">
      <CoverImage
        mobileSrc="/images/footer-mobile.webp"
        desktopSrc="/images/footer-desktop.webp"
        alt="Rene and Arthur walking hand in hand down a cypress-lined path"
        className="object-center"
      />
    </section>
  );
}
