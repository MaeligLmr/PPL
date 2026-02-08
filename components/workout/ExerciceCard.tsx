import { WorkoutLineWithDetails } from "@/types/Workout";
import { SetRow } from "./SetRow";
import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Select, { SelectOption } from "../ui/Select";
import { Exercise } from "@/types/Exercise";
import { getExercisesWithPreferences } from "@/services/exercise.service";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export function ExerciseCard({ exercise }: { exercise: WorkoutLineWithDetails }) {
    const [isEditing, setIsEditing] = useState(false);
    const [exercises, setExercises] = useState<SelectOption[]>([]);
    useEffect(() => {
        getExercisesWithPreferences().then((data) => {
            setExercises(data as SelectOption[]);
        });
    }, [])
    const editExercise = (exoId: string) => {
        //TODO : edit exercice of workout
    }

  return (
    <div className="exercise-card">
      <div className="exercise-header">
        if (isEditing) {
          <Select options={exercises} defaultValue={exercise.exercise.id} onChange={e => editExercise(e.target.value)}></Select>
        } else {
          <span>{exercise.exercise.nom}</span>
        }
        <Button variant="icon-plain"
            icon={<FontAwesomeIcon icon={faPen} />}
         onClick={() => setIsEditing(!isEditing)}>
          
        </Button>
      </div>

      {exercise.sets.map((set, i) => (
        <SetRow key={set.id} set={set} index={i} />
      ))}

      <button className="add-set">
        + Nouvelle série
      </button>
    </div>
  );
}
