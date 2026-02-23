"use client";

import { useEffect, useState } from "react";
import {
  getExercisesWithPreferences,
  toggleExerciseHidden,
} from "@/services/exercise.service";
import { Exercise } from "@/types/Exercise";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { usePageTitle } from "@/components/layout/PageTitleContext";
import Toggle from "@/components/ui/Toggle";
import SettingsItem from "@/components/ui/SettingsItem";
import Input from "@/components/ui/Input";
import Select, { CustomSelectOption } from "@/components/ui/Select";
import { getCategoriesForSelect } from "@/services/category.service";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<CustomSelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  
   function load() {
    getExercisesWithPreferences().then((data) => setExercises(data as Exercise[])).catch(() => {toast.error("Erreur lors du chargement des exercices.")}).finally(() => setLoading(false));
    
  }

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Exercices");
  }, [setTitle]);

  useEffect(() => {
    load();
  }, []);

  async function handleToggle(exo: Exercise) {
    await toggleExerciseHidden(exo.id, !exo.hidden);
    load();
  }

  useEffect(() => {
    getCategoriesForSelect().then(setCategories);
  }, []);

  const filteredExercises = exercises.filter((exo) => {
    const matchSearch = exo.nom.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      !selectedCategory ||
      (exo.categories && exo.categories.some((c) => c.id === selectedCategory));
    return matchSearch && matchCategory;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Button variant="icon-plain" icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={() => { window.history.back() }}></Button>
      <div className="filters">
        <Input
          placeholder="Rechercher un exercice..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1 }}
          fullWidth
        />
        <Select
          options={[{ label: "Toutes catégories", value: "" }, ...categories]}
          value={selectedCategory}
          onChange={(value: string) => {setSelectedCategory(value)}}
          fullWidth
        />
      </div>
      {filteredExercises.map((exo) => (
        <SettingsItem
          key={exo.id}
          icon={exo.svg ? (
            <div 
              dangerouslySetInnerHTML={{ __html: exo.svg }} 
              style={{ 
                width: '24px', 
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} 
              className="exercise-icon"
            />
          ) : null}
          label={exo.nom + (exo.categories ? ` (${exo.categories.map(c => c.nom).join(", ")})` : "")}
          right={
            <Toggle
              options={[
                { label: <FontAwesomeIcon icon={faEye} />, value: false },
                { label: <FontAwesomeIcon icon={faEyeSlash} />, value: true },
              ]}
              value={exo.hidden as boolean}
              onChange={() => handleToggle(exo)}
            />
          }
        />
      ))}
    </>
  );
}