import Image from "next/image";

export default function Landing() {
  return (
    <div className="p-4">
      <Image src="/shop.jpg" alt="" width={200} height={600}></Image>
    </div>
  );
}
