import { BarberService as IBarberService } from "@/types";

interface BarberServiceProps {
  barberService: IBarberService;
  actions: {
    updateBarberService: (barberService: IBarberService) => void;
    deleteBarberService: (id: string) => void;
  };
}

export default function BarberService({
  barberService,
  actions,
}: BarberServiceProps) {
  const { updateBarberService, deleteBarberService } = actions;

  function formatBarberServiceDuration() {
    const hours = Math.trunc(barberService.durationInMinutes / 60);
    const minutes = barberService.durationInMinutes % 60;
    return hours
      ? `${hours}h ${minutes ? `${minutes}min` : ""}`
      : `${barberService.durationInMinutes}min`;
  }

  //TODO: implement update barber service
  return (
    <div className="text-neutral-500 bg-white">
      <div className="w-full h-full focus:outline-neutral-300 mb-4">
        <div className="w-full flex justify-between">
          <p className="mb-4">{barberService.name}</p>
          <p className="">${barberService.priceInUSD} USD</p>
        </div>
        <p className="text-neutral-500 mb-4">{barberService.description}</p>
        <p className="mb-4">Duration: {formatBarberServiceDuration()}</p>
        <button
          className="w-16 p-2 bg-neutral-100 rounded mr-4"
          onClick={() => updateBarberService(barberService)}
        >
          Edit
        </button>
        <button
          className="w-16 p-2 text-neutral-400"
          // onClick={() => deleteBarberService(barberService.id)}
        >
          Delete
        </button>
      </div>
      <hr />
    </div>
  );
}
