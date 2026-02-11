import { Serie } from "@/types/Workout";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { addRep, deleteRep, editRep } from "@/services/workout.service";

export function SetRow({ set, onUpdate }: { set: Serie, onUpdate?: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddRep = async () => {
    try {
      await addRep(set.id, 0, 0); // Ajouter une rep avec charge et qte à 0
      onUpdate?.(); // Notifier le parent pour recharger les données
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la rep:', error);
    }
  };

  return (
    <div className="set-row">
      {/* Header de la série avec chevron */}
      <div
        className="set-header"
        onClick={() => setIsExpanded(!isExpanded)}
        
      >
        <FontAwesomeIcon
          icon={isExpanded ? faChevronDown : faChevronRight}
          style={{ fontSize: '0.8rem' }}
        />
        <span>Série {set.ordre}</span>
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
                onChange={(e) => {editRep(rep.id, parseFloat(e.target.value), rep.qte || 0); onUpdate?.()}}
                style={{ flex: 1 }}
              />
              <Input
                label="Reps"
                type="number"
                defaultValue={rep.qte?.toString()}
                onChange={(e) => {editRep(rep.id, rep.charge || 0, parseInt(e.target.value)); onUpdate?.()}}
                style={{ flex: 1 }}
              />
              <Button variant="icon-plain" icon={<FontAwesomeIcon icon={faTrash} />} onClick={() => {deleteRep(rep.id); onUpdate?.()}}>
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
    </div>
  );
}
