import { WorkoutLineWithDetails } from "@/types/Workout";
import { SetRow } from "./SetRow";
import { useEffect, useState } from "react";
import Select, { SelectOption } from "../ui/Select";
import { getExercisesForSelect } from "@/services/exercise.service";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faChevronRight, faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { updateWorkoutLine, addSet } from "@/services/workout.service";

export function ExerciseCard({ exercise, id_category, isNew, onExerciseUpdate }: { exercise: WorkoutLineWithDetails, id_category: string, isNew: boolean, onExerciseUpdate?: () => void }) {
  const [isEditing, setIsEditing] = useState(isNew);
  const [isExpanded, setIsExpanded] = useState(false);
  const [exercises, setExercises] = useState<SelectOption[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(exercise.exercise?.id || null);
  useEffect(() => {
    getExercisesForSelect(id_category).then((data) => {
      setExercises(data as SelectOption[]);
      // Initialiser selectedExercise avec l'exercice actuel
      if (exercise.exercise?.id) {
        setSelectedExercise(exercise.exercise.id);
        console.log(exercise)
      }
      // Seulement passer en mode édition si c'est un nouvel exercice ET qu'on n'a jamais été édité
      if (isNew) {
        setIsEditing(true);
      }
    });
  }, [isNew, id_category, exercise.exercise?.id])

  const editExercise = () => {
    console.log("Selected exercise:", selectedExercise);
    updateWorkoutLine(exercise.id, selectedExercise!).then(() => {
      setIsEditing(false);
      onExerciseUpdate?.(); // Notifier le parent de la mise à jour
    });
  }
  const handleAddSet = async () => {
    try {
      const maxOrder = Math.max(0, ...(exercise.serie?.map(s => s.ordre) || []));
      await addSet(exercise.id, maxOrder + 1);
      onExerciseUpdate?.(); // Recharger les données après ajout de série
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la série:', error);
    }
  };

  return (
    <div className="exercise-card">
      {/* Header avec bouton chevron et titre */}
      <div className="exercise-header">
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-10)', flex: 1, cursor: 'pointer' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronRight}
            style={{ padding: 'var(--spacing-10)', cursor: 'pointer' }}
          />

          {isEditing ? (
            <Select
              options={[{ label: 'Choisir un exercice', value: '' }, ...exercises]}
              value={selectedExercise || ""}
              onChange={e => setSelectedExercise(e.target.value)}
              style={{ flex: 1 }}
              fullWidth
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span style={{ flex: 1 }}>{exercise.exercise?.nom || 'Nouvel exercice'}</span>
          )}
        </div>

        {isEditing ? (
          <Button variant="icon-outlined"
            icon={<FontAwesomeIcon icon={faCheck} />}
            onClick={() => editExercise()}>
          </Button>
        ) : (
          <Button variant="icon-plain"
            icon={<FontAwesomeIcon icon={faPen} />}
            onClick={() => setIsEditing(!isEditing)}>
          </Button>
        )}
      </div>

      {/* Détails des séries (collapsible) */}
      {isExpanded && (
        <div className="exercise-details">
          {exercise.serie && exercise.serie.length > 0 && (
            exercise.serie.map((set) => (
              <SetRow key={set.id} set={set} onUpdate={onExerciseUpdate} />
            ))
          )}
          <Button variant="outlined" onClick={handleAddSet}
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            Nouvelle série
          </Button>
        </div>
      )}
    </div>
  );
}
