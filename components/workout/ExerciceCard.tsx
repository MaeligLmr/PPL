import { WorkoutLineWithDetails } from "@/types/Workout";
import { SetRow } from "./SetRow";
import { useEffect, useState } from "react";
import Select, { SelectOption } from "../ui/Select";
import { getExercisesForSelect } from "@/services/exercise.service";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { updateWorkoutLine } from "@/services/workout.service";

export function ExerciseCard({ exercise, id_category, isNew, onExerciseUpdate }: { exercise: WorkoutLineWithDetails, id_category: string, isNew: boolean, onExerciseUpdate?: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [exercises, setExercises] = useState<SelectOption[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  useEffect(() => {
    getExercisesForSelect(id_category).then((data) => {
      setExercises(data as SelectOption[]);
      setIsEditing(isNew);
    });
  }, [isNew, id_category])
  const editExercise = () => {
    updateWorkoutLine(exercise.id, selectedExercise!).then(() => {
      setIsEditing(false);
      onExerciseUpdate?.(); // Notifier le parent de la mise à jour
    });
  }
  const addSet = (workoutLineId: string) => {
    // Logic to add a new set to the workout line
  }

  return (
    <div className="exercise-card">
      <div className="exercise-header">
        {isEditing ? (
          <>
            <Select options={exercises} defaultValue={exercise.exercise ? exercise.exercise.id : ""} onChange={e => setSelectedExercise(e.target.value)} />
            <Button variant="icon-plain"
              icon={<FontAwesomeIcon icon={faCheck} />}
              onClick={() => editExercise()}>
            </Button>
          </>
        ) : (
          <>
            <span>{exercise.exercise?.nom}</span>

            <Button variant="icon-plain"
              icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => setIsEditing(!isEditing)}>

            </Button> </>
        )}
      </div>
      {exercise.sets && (
        exercise.sets.map((set, i) => (
          <SetRow key={set.id} set={set} index={i} />
        ))
      )}
      <Button variant="outlined" onClick={() => addSet(exercise.id)}>
        + Nouvelle série
      </Button>
    </div>
  );
}
