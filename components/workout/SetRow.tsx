import { Serie } from "@/types/Workout";
import Input from "../ui/Input";
export function SetRow({ set, index }: { set: Serie; index: number }) {
  return (
    <div className="set-row">
      <span>Série {index + 1}</span>
        {set.reps.map((rep) => (
            <div key={rep.id} className="rep-row">
                <Input label="Charge (kg)" type="number" defaultValue={rep.charge} />
                <Input label="Reps" type="number" defaultValue={rep.qte} />
            </div>
        ))}
    </div>
  );
}
