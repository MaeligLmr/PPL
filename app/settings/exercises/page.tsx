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
import Select, { SelectOption } from "@/components/ui/Select";
import { getCategoriesForSelect } from "@/services/category.service";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<SelectOption[]>([]);
  async function load() {
    const data = await getExercisesWithPreferences();
    setExercises(data as Exercise[]);
  }

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Exercices");
  }, [setTitle]);

  useEffect(() => {
    getExercisesWithPreferences().then(data => setExercises(data as Exercise[]));
  }, []);

  async function handleToggle(exo: Exercise) {
    await toggleExerciseHidden(exo.id, !exo.hidden);
    load();
  }

  // Extraire toutes les catégories uniques
  useEffect(() => {
    getCategoriesForSelect().then(setCategories);
  }, []);

  // Filtrage dynamique
  const filteredExercises = exercises.filter((exo) => {
    const matchSearch = exo.nom.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      !selectedCategory ||
      (exo.categories && exo.categories.some((c) => c.nom === selectedCategory));
    return matchSearch && matchCategory;
  });

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
          onChange={e => setSelectedCategory(e.target.value)}
          fullWidth
        />
      </div>
      {filteredExercises.map((exo) => (
        <SettingsItem
          key={exo.id}
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
