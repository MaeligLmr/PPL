"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/category.service";
import { Category } from "@/types/Category";
import { usePageTitle } from "@/components/layout/PageTitleContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/ui/Button";
import SettingsItem from "@/components/ui/SettingsItem";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    getCategories().then(setCategories).catch(() => toast.error("Erreur lors du chargement des catégories.")).finally(() => setLoading(false));
  }, []);
  const  { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Catégories");
  }, [setTitle]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Button variant="icon-plain" icon={<FontAwesomeIcon icon={faArrowLeft} />} onClick={() => {window.history.back()}}></Button>
      {categories.map((cat) => (
        <SettingsItem
          key={cat.id}
          label={cat.nom}
        />
      ))}
    </>
  );
}
