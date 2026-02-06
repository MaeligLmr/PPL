export type Exercise = {
    id: number;
    nom: string;
    svg: string | null;
    hidden?: boolean;
    categories?: {
        id: number;
        nom: string;
    }[];
};

export type ExerciseRow = {
    id: number;
    nom: string;
    svg: string | null;
    exo_categorie?: { categorie: { id: number; nom: string }[] }[];
    user_exo_preferences?: { hidden: boolean }[];
};
