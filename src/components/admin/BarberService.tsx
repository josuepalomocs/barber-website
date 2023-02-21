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

  return (
    <div className="text-neutral-500 bg-neutral-100 rounded text-sm">
      <div className="w-full h-full focus:outline-neutral-300 p-4">
        <div>
          <p className="mb-4 text-base text-black">{`${barberService.name}`}</p>
        </div>
        <div>
          <p className="font-medium">Description</p>
          <p className="mb-4">{barberService.description || "N/A"}</p>
        </div>
        <div>
          <p className="font-medium">Duration</p>
          <p className="mb-4">{formatBarberServiceDuration()}</p>
        </div>
        <div>
          <p className="font-medium">Price</p>
          <p className="mb-4">${barberService.priceInUSD}</p>
        </div>
        <button
          className="text-xs w-16 p-3 bg-neutral-200 rounded mr-4"
          onClick={() => updateBarberService(barberService)}
        >
          EDIT
        </button>
        <button
          className="text-xs w-16 p-3 text-neutral-400"
          // onClick={() => deleteBarberService(barberService.id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
