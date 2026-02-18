'use client';
import { usePageTitle } from "@/components/layout/PageTitleContext";
import Button from "@/components/ui/Button";
import SettingsItem from "@/components/ui/SettingsItem";
import ToggleColor from "@/components/ui/ToggleColor";
import ToggleTheme from "@/components/ui/ToggleTheme";
import { supabase } from "@/lib/supabase";
import { getProfile } from "@/services/profile.service";
import { Profile } from "@/types/Profile";
import { faChildReaching, faDumbbell, faLayerGroup, faLock, faPalette, faPen, faSignOut, faSwatchbook, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const { setTitle } = usePageTitle()
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        setTitle('Paramètres')
    }, [setTitle])

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile()
                setProfile(profileData)
            } catch (error) {
                console.error('Erreur lors du chargement du profil:', error)
            }
        }
        fetchProfile()
    }, [])

    return (
        <>

            <SettingsItem
                icon={<FontAwesomeIcon icon={faLayerGroup} />}
                label="Les catégories"
                href="/settings/categories"
            />

            <SettingsItem
                icon={<FontAwesomeIcon icon={faDumbbell} />}
                label="Les exercices"
                href="/settings/exercises"
            />

            <SettingsItem
                icon={<FontAwesomeIcon icon={faChildReaching} />}
                label="Mes informations"
                href="/settings/my-infos"
            />

            <SettingsItem
                icon={<FontAwesomeIcon icon={faPen} />}
                label="Modifier mes informations"
                href="/settings/edit-profile"
            />

            <SettingsItem
                icon={<FontAwesomeIcon icon={faLock} />}
                label="Modifier mon mot de passe"
                href="/settings/change-password"
            />

            <SettingsItem
                icon={<FontAwesomeIcon icon={faSwatchbook} />}
                label="Thème"
                right={<ToggleTheme />}
            />

            <SettingsItem
                icon={<FontAwesomeIcon icon={faPalette} />}
                label="Couleur"
                right={<ToggleColor />}
            />

            {profile?.premium && (
                <SettingsItem
                    icon={<FontAwesomeIcon icon={faVolumeUp} />}
                    label="Son"
                    href="/settings/sounds"
                />
            )}

            <Button
                variant="plain"
                align="left"
                style={{ paddingLeft: 0, paddingRight: 0, color: 'var(--theme-text)' }}
                leftIcon={<FontAwesomeIcon icon={faSignOut} />}
                onClick={() => { supabase.auth.signOut().then(() => { window.location.href = 'PPL/auth/login' }) }}>
                Se déconnecter
            </Button>

        </>
    );
}
