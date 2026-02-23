'use client';
import { usePageTitle } from "@/components/layout/PageTitleContext";
import Button from "@/components/ui/Button";
import { getProfile, updateSound } from "@/services/profile.service";
import { playSound, invalidateSoundCache } from "@/services/sound.service";
import { faPlay, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SoundOption = {
    name: string;
    file: string;
    label: string;
}

const soundOptions: SoundOption[] = [
    { name: 'none', file: '', label: 'Aucun son' },
    { name: 'beep', file: 'sound1.mp3', label: 'Bip classique' },
    { name: 'ding', file: 'sound2.mp3', label: 'Ding' },
    { name: 'bell', file: 'sound3.mp3', label: 'Cloche' },
    { name: 'bip', file: 'Bip.m4a', label: 'Bip mae' },
    { name : 'ploc', file: 'Ploc.m4a', label: 'Ploc mae' },
    { name : 'tut', file: 'Tut.m4a', label: 'Tut mae' },
];

export default function SoundsPage() {
    const { setTitle } = usePageTitle();
    const router = useRouter();
    const [currentSound, setCurrentSound] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isPremium, setIsPremium] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle('Son');
    }, [setTitle]);

    useEffect(() => {
        const checkPremiumAndLoad = async () => {
            try {
                const profileData = await getProfile();
                setCurrentSound(profileData.son);
                setIsPremium(profileData.premium);

                // Si l'utilisateur n'est pas premium, rediriger vers les paramètres
                if (!profileData.premium) {
                    router.replace('/settings');
                    return;
                }
            } catch (error) {
                console.error('Erreur lors du chargement du profil:', error);
                toast.error('Erreur lors du chargement du profil');
                router.replace('/settings');
            } finally {
                setIsLoading(false);
            }
        };

        checkPremiumAndLoad();
    }, [router]);

    // Si en cours de chargement ou pas premium, ne rien afficher
    if (isLoading || !isPremium) {
        return null;
    }


    const handleSoundSelect = async (soundFile: string) => {
        setIsUpdating(true);
        try {
            // Si soundFile est vide, on met null en base
            const soundToSave = soundFile === '' ? null : soundFile;
            await updateSound(soundToSave);
            setCurrentSound(soundToSave);

            // Invalider le cache du service son après mise à jour
            invalidateSoundCache();

            toast.success('Son mis à jour !');

            // Jouer le son sélectionné (sauf si c'est "Aucun son")
            if (soundFile !== '') {
                playSound(soundFile);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du son:', error);
            toast.error('Erreur lors de la mise à jour du son');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            {soundOptions.map((sound) => (
                <div key={sound.name} className="sound-option">
                    <div className="sound-info" onClick={() => playSound(sound.file)} style={{ cursor: sound.file !== '' ? 'pointer' : 'default' }}>
                        {sound.file !== '' && <FontAwesomeIcon icon={faPlay} />}
                        <h3>{sound.label}</h3>
                    </div>

                    <div className="sound-actions">
                        <Button
                            variant={(currentSound === sound.file || (currentSound === null && sound.file === '')) ? "icon-filled" : "icon-outlined"}
                            onClick={() => handleSoundSelect(sound.file)}
                            disabled={isUpdating}
                            style={{ minHeight: '2.75rem' }}
                            icon={(currentSound === sound.file || (currentSound === null && sound.file === '')) ? <FontAwesomeIcon icon={faCheck} /> : undefined}
                        >
                            {(currentSound === sound.file || (currentSound === null && sound.file === '')) ? '' : ''}
                        </Button>
                    </div>
                </div>
            ))}

        </>
    );
}
