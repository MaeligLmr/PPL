export type Exercise = {
    id: string;
    nom: string;
    svg: string | null;
    hidden?: boolean;
    categories?: {
        id: string;
        nom: string;
    }[];
};

export type ExerciseRow = {
    id: string;
    nom: string;
    svg: string | null;
    exo_categorie?: { categorie: { id: string; nom: string }[] }[];
    user_exo_preferences?: { hidden: boolean }[];
};
