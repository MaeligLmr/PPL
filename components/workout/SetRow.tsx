import { Serie } from "@/types/Workout";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ConfirmDialog from "../ui/ConfirmDialog";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { addRep, deleteRep, editRep, deleteSerie } from "@/services/workout.service";

export function SetRow({ set, onUpdate, workoutId }: { set: Serie, onUpdate?: () => void, workoutId: string }) {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(`workout_${workoutId}_set_${set.id}_expanded`);
    return saved ? JSON.parse(saved) : false;
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // État local pour les valeurs des inputs
  const [repValues, setRepValues] = useState<{ [key: string]: { charge: string, qte: string } }>(() => {
    const initial: { [key: string]: { charge: string, qte: string } } = {};
    set.reps?.forEach(rep => {
      initial[rep.id] = {
        charge: rep.charge?.toString() || '0',
        qte: rep.qte?.toString() || '0'
      };
    });
    return initial;
  });

  const handleToggleExpanded = (value: boolean) => {
    setIsExpanded(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`workout_${workoutId}_set_${set.id}_expanded`, JSON.stringify(value));
    }
  };

  const handleRepChange = (repId: string, field: 'charge' | 'qte', value: string) => {
    // Mettre à jour l'état local immédiatement
    setRepValues(prev => ({
      ...prev,
      [repId]: {
        ...prev[repId],
        [field]: value
      }
    }));

    // Puis sauvegarder en base
    const numValue = field === 'charge' ? parseFloat(value) || 0 : parseInt(value) || 0;
    const currentRep = set.reps?.find(r => r.id === repId);
    if (currentRep) {
      const currentValues = repValues[repId] || { charge: '0', qte: '0' };
      const charge = field === 'charge' ? numValue : parseFloat(currentValues.charge) || 0;
      const qte = field === 'qte' ? numValue : parseInt(currentValues.qte) || 0;
      editRep(repId, charge, qte);
    }
  };

  const handleAddRep = async () => {
    try {
      await addRep(set.id, 0, 0);
      // Mettre à jour l'état local pour la nouvelle rep
      const newReps = [...(set.reps || [])];
      if (newReps.length > 0) {
        const newRep = newReps[newReps.length - 1];
        setRepValues(prev => ({
          ...prev,
          [newRep.id]: { charge: '0', qte: '0' }
        }));
      }
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
          {set.reps?.map((rep) => {
            const repValue = repValues[rep.id] || {
              charge: rep.charge?.toString() || '0',
              qte: rep.qte?.toString() || '0'
            };

            return (
              <div key={rep.id} className="rep-row">
                <Input
                  label={`Charge (kg)`}
                  type="number"
                  value={repValue.charge}
                  onChange={(e) => handleRepChange(rep.id, 'charge', e.target.value)}
                  fullWidth
                />
                <Input
                  label="Reps"
                  type="number"
                  value={repValue.qte}
                  onChange={(e) => handleRepChange(rep.id, 'qte', e.target.value)}
                  fullWidth
                />
                <Button variant="icon-plain" icon={<FontAwesomeIcon icon={faTrash} />} onClick={() => handleDeleteRep(rep.id)}>
                </Button>
              </div>
            );
          })}

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
