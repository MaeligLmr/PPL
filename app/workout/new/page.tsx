'use client'
import Button from "@/components/ui/Button"
import DatePicker from "@/components/ui/DatePicker"
import Select, { CustomSelectOption } from "@/components/ui/Select"
import { getCategoriesForSelect } from "@/services/category.service"
import { createWorkout } from "@/services/workout.service"
import { getUser } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { usePageTitle } from "@/components/layout/PageTitleContext"
import { toast } from "sonner"
import Image from "next/image"


export default function NewWorkoutPage() {
    const router = useRouter()
    const [categories, setCategories] = useState<CustomSelectOption[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const { setTitle } = usePageTitle()

    useEffect(() => {
        getUser().then((user) => {
            setUserId(user?.data?.user?.id ?? null)
        })
        getCategoriesForSelect().then((fetchedCategories) => {
            setCategories(fetchedCategories)
            if (fetchedCategories.length > 0) {
                setSelectedCategory(fetchedCategories[0].value.toString())
            }
        })
        setTitle("Nouvelle séance")
    }, [setTitle])

    const handleCreateWorkout = async () => {
        if (!userId || !selectedCategory || !selectedDate) return

        try {
            setLoading(true)
            const workout = await createWorkout(userId, selectedDate, selectedCategory)
            toast.success('Séance créée')

            // Attendre 1 seconde pour afficher le GIF avant de naviguer
            setTimeout(() => {
                router.push(`/workout/?workout=${workout.id}`)
            }, 1700)
        } catch (error) {
            console.error('Erreur création séance:', error)
            toast.error('Erreur lors de la création de la séance')
            setLoading(false)
        }
    }

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="loader-container">
                        <Image
                            src="/PPL/carrot.gif"
                            alt="Loading..."
                            width={200}
                            height={300}
                            className="loader-gif"
                            unoptimized
                        />
                    </div>
                </div>
            )}
            <div className="content">
                <Select
                    options={categories}
                    value={selectedCategory}
                    onChange={(value: string) => { setSelectedCategory(value) }}
                    fullWidth
                />
                <DatePicker
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Button
                    variant="filled"
                    fullWidth
                    onClick={handleCreateWorkout}
                    disabled={loading || !userId}
                >
                    {loading ? "Création..." : "Créer la séance"}
                </Button>
            </div>
        </>
    )
}
