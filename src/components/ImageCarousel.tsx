import Image from "next/image";

export default function ImageCarousel() {
  return (
    <div className="px-4">
      <Image
        className="object-fit"
        src="/cut.jpg"
        alt="Carousel image"
        width={200}
        height={200}
      />
    </div>
  );
}
