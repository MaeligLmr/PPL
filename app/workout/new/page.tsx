'use client'
import Button from "@/components/ui/Button"
import DatePicker from "@/components/ui/DatePicker"
import Select, { SelectOption } from "@/components/ui/Select"
import { getCategoriesForSelect } from "@/services/category.service"
import { createWorkout } from "@/services/workout.service"
import { getUser } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { usePageTitle } from "@/components/layout/PageTitleContext"
import { toast } from "sonner"

export default function NewWorkoutPage() {
    const router = useRouter()
    const [categories, setCategories] = useState<SelectOption[]>([])
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
            router.push(`/workout/?workout=${workout.id}`)
        } catch (error) {
            console.error('Erreur création séance:', error)
            toast.error('Erreur lors de la création de la séance')
            setLoading(false)
        }
    }

    return (
        <div className="content">
            <Select 
                options={categories} 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                fullWidth
            />
            <DatePicker 
                value={selectedDate}
                onChange={(date) => setSelectedDate(date.target.value)}
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
    )
}
