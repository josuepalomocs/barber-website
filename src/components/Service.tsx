interface ServiceProps {
  name: string;
  durationInMinutes: number;
  price: number;
}

export default function Service({
  name,
  durationInMinutes,
  price,
}: ServiceProps) {
  const hours = Math.trunc(durationInMinutes / 60);
  const minutesRemainder = durationInMinutes % 60;
  let durationString = hours
    ? `${hours}h ${minutesRemainder ? `${minutesRemainder}min` : ""}`
    : `${durationInMinutes}min`;
  return (
    <button className="w-full h-full flex justify-between text-left p-4 focus:outline-neutral-300">
      <div className="">
        <p className="mb-2">{name}</p>
        <p className="text-neutral-500">{durationString}</p>
      </div>
      <p className="">${price}</p>
    </button>
  );
}
