import { Serie } from "@/types/Workout";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { addRep, deleteRep, editRep, deleteSerie } from "@/services/workout.service";

export function SetRow({ set, onUpdate, workoutId }: { set: Serie, onUpdate?: () => void, workoutId: string }) {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(`workout_${workoutId}_set_${set.id}_expanded`);
    return saved ? JSON.parse(saved) : false;
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggleExpanded = (value: boolean) => {
    setIsExpanded(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`workout_${workoutId}_set_${set.id}_expanded`, JSON.stringify(value));
    }
  };

  const handleRepChange = (repId: string, charge: number, qte: number) => {
    editRep(repId, charge, qte);
  };

  const handleAddRep = async () => {
    try {
      await addRep(set.id, 0, 0);
      onUpdate?.();
      toast.success('Rep ajoutée');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la rep:', error);
      toast.error('Erreur lors de l\'ajout de la rep');
    }
  };

  const handleDeleteRep = async (repId: string) => {
    try {
      await deleteRep(repId);
      onUpdate?.();
      toast.success('Rep supprimée');
    } catch (error) {
      console.error('Erreur lors de la suppression de la rep:', error);
      toast.error('Erreur lors de la suppression de la rep');
    }
  };

  const handleDeleteSerie = async () => {
    try {
      await deleteSerie(set.id);
      onUpdate?.();
      toast.success('Série supprimée');
    } catch (error) {
      console.error('Erreur lors de la suppression de la série:', error);
      toast.error('Erreur lors de la suppression de la série');
    }
  };

  return (
    <div className="set-row">
      {/* Header de la série avec chevron */}
      <div
        className="set-header"
        onClick={() => handleToggleExpanded(!isExpanded)}
      >
        <div className="set-title">
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronRight}
            style={{ fontSize: '0.8rem' }}
          />
          <span>Série {set.ordre}</span>
        </div>
        <Button 
          variant="icon-plain" 
          icon={<FontAwesomeIcon icon={faTrash} />} 
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteConfirm(true);
          }}
        />
      </div>

      {/* Détails des reps (collapsible) */}
      {isExpanded && (
        <div className="reps-container">
          {set.reps?.map((rep, index) => (
            <div key={rep.id} className="rep-row">
              <Input
                label={`Charge (kg)`}
                type="number"
                defaultValue={rep.charge?.toString()}
                onChange={(e) => handleRepChange(rep.id, parseFloat(e.target.value), rep.qte || 0)}
                fullWidth
              />
              <Input
                label="Reps"
                type="number"
                defaultValue={rep.qte?.toString()}
                onChange={(e) => handleRepChange(rep.id, rep.charge || 0, parseInt(e.target.value))}
                fullWidth
              />
              <Button variant="icon-plain" icon={<FontAwesomeIcon icon={faTrash} />} onClick={() => handleDeleteRep(rep.id)}>
              </Button>
            </div>
          ))}

          <Button
            variant="plain"
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleAddRep}
            fullWidth
          >
            Ajouter une rep
          </Button>
        </div>
      )}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Supprimer la série"
        message="Êtes-vous sûr de vouloir supprimer cette série ? Cette action est irréversible."
        onConfirm={() => {
          setShowDeleteConfirm(false);
          handleDeleteSerie();
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}
