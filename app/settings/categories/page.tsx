"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/Category";
import { usePageTitle } from "@/components/layout/PageTitleContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/ui/Button";
import SettingsItem from "@/components/ui/SettingsItem";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);
  const  { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Catégories");
  }, [setTitle]);

  return (
    <div>
    <Button variant="icon-plain" icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={() => {window.history.back()}}></Button>
      {categories.map((cat) => (
        <SettingsItem
          key={cat.id}
          label={cat.nom}
        />
      ))}
    </div>
  );
}
