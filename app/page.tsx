"use client";

import { useEffect, useRef, useState } from "react";
import { getWorkoutById, getWorkoutsPaginated } from "@/services/workout.service";
import { usePageTitle } from "@/components/layout/PageTitleContext";
import { getUser } from "@/services/auth.service";
import Button from "@/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Workout } from "@/types/Workout";
import { WorkoutTile } from "@/components/ui/WorkoutTile";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    getUser().then((fetchedUser) => {
      setUserId(fetchedUser?.data?.user?.id ?? null);
    });
  }, []);



  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Dernières séances");
  }, [setTitle]);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!userId) return;
    if (!hasMore) return;

    const load = async () => {
      setLoading(true);

      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const newWorkouts = await getWorkoutsPaginated(userId, from, to);

      setWorkouts((prev) => (page === 0 ? newWorkouts : [...prev, ...newWorkouts]));
      setHasMore(newWorkouts.length === PAGE_SIZE);
      setLoading(false);
    };

    load();
    console.log(getWorkoutById("23ca9799-a299-4221-b8b5-3f38d81e9374"))
  }, [userId, page, hasMore]);
  useEffect(() => {
    if (!hasMore) return;
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && workouts.length > 0) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "200px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loaderRef, loading, hasMore, workouts.length]);

  const goToNew = () => {
    router.push('workout/new')
  }

  return (
    <div>
      {workouts.map((workout) => (
        <WorkoutTile key={workout.id} workout={workout} />
      ))}

      {hasMore && (
        <div ref={loaderRef} className="p-4 text-center">
          Chargement...
        </div>
      )}

      <Button
        variant="icon-filled"
        size="lg"
        className="fab-button"
        aria-label="Ajouter une séance"
        icon={<FontAwesomeIcon icon={faPlus} />
      }
        onClick={goToNew}
      />
    </div>
  );
}
