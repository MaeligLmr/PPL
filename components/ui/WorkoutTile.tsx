import { Workout } from "@/types/Workout"
import Link from "next/link"
import { playUserSound } from "@/services/sound.service"

export const WorkoutTile = ({ workout }: { workout: Workout }) => {
    const handleClick = () => {
        playUserSound();
    };

    return (
        <Link
            className="workout tile"
            href={`/workout/?workout=${workout.id}`}
            onClick={handleClick}
        >
            <h3 className="text-lg font-semibold mb-2">Séance du {new Date(workout.date).toLocaleDateString()}</h3>
            <span className="tag">{workout.categorie?.nom}</span>
        </Link>
    )
}