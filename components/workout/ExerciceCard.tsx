import { WorkoutLineWithDetails } from "@/types/Workout";
import { SetRow } from "./SetRow";
import { useEffect, useState } from "react";
import Select, { SelectOption } from "../ui/Select";
import { getExercisesForSelect } from "@/services/exercise.service";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faChevronRight, faChevronDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateWorkoutLine, addSet, deleteExercise } from "@/services/workout.service";

export function ExerciseCard({ exercise, id_category, isNew, onExerciseUpdate, workoutId }: { exercise: WorkoutLineWithDetails, id_category: string, isNew: boolean, onExerciseUpdate?: () => void, workoutId: string }) {
  const [isEditing, setIsEditing] = useState(isNew);
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(`workout_${workoutId}_exercise_${exercise.id}_expanded`);
    return saved ? JSON.parse(saved) : false;
  });
  const [exercises, setExercises] = useState<SelectOption[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(exercise.exercise?.id || null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggleExpanded = (value: boolean) => {
    setIsExpanded(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`workout_${workoutId}_exercise_${exercise.id}_expanded`, JSON.stringify(value));
    }
  };
  useEffect(() => {
    getExercisesForSelect(id_category).then((data) => {
      setExercises(data as SelectOption[]);
      // Initialiser selectedExercise avec l'exercice actuel
      if (exercise.exercise?.id) {
        setSelectedExercise(exercise.exercise.id);
      }
      if (isNew) {
        setIsEditing(true);
      }
    });
  }, [isNew, id_category, exercise.exercise?.id])

  const editExercise = async () => {
    try {
      await updateWorkoutLine(exercise.id, selectedExercise!);
      setIsEditing(false);
      onExerciseUpdate?.();
      toast.success('Exercice mis à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'exercice:', error);
      toast.error('Erreur lors de la mise à jour de l\'exercice');
    }
  }
  const handleAddSet = async () => {
    try {
      const maxOrder = Math.max(0, ...(exercise.serie?.map(s => s.ordre) || []));
      await addSet(exercise.id, maxOrder + 1);
      onExerciseUpdate?.();
      toast.success('Série ajoutée');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la série:', error);
      toast.error('Erreur lors de l\'ajout de la série');
    }
  };

  const handleDeleteExercise = async () => {
    try {
      await deleteExercise(exercise.id);
      onExerciseUpdate?.();
      toast.success('Exercice supprimé');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'exercice:', error);
      toast.error('Erreur lors de la suppression de l\'exercice');
    }
  };

  return (
    <div className="exercise-card">
      {/* Header avec bouton chevron et titre */}
      <div className="exercise-header">
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-10)', flex: 1, cursor: 'pointer' }}
          onClick={() => handleToggleExpanded(!isExpanded)}
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
          <div style={{ display: 'flex', gap: 'var(--spacing-5)' }}>
            <Button variant="icon-plain"
              icon={<FontAwesomeIcon icon={faPen} />}
              onClick={() => setIsEditing(!isEditing)}>
            </Button>
            <Button variant="icon-plain"
              icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={() => setShowDeleteConfirm(true)}>
            </Button>
          </div>
        )}
      </div>

      {/* Détails des séries (collapsible) */}
      {isExpanded && (
        <div className="exercise-details">
          {exercise.serie && exercise.serie.length > 0 && (
            exercise.serie.map((set) => (
              <SetRow key={set.id} set={set} onUpdate={onExerciseUpdate} workoutId={workoutId} />
            ))
          )}
          <Button variant="outlined" onClick={handleAddSet}
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
          >
            Nouvelle série
          </Button>
        </div>
      )}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Supprimer l'exercice"
        message="Êtes-vous sûr de vouloir supprimer cet exercice ? Cette action est irréversible."
        onConfirm={() => {
          setShowDeleteConfirm(false);
          handleDeleteExercise();
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
