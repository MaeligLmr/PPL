'use client';
import { usePageTitle } from "@/components/layout/PageTitleContext";
import SettingsItem from "@/components/ui/SettingsItem";
import ToggleColor from "@/components/ui/ToggleColor";
import ToggleTheme from "@/components/ui/ToggleTheme";
import { faDumbbell, faLayerGroup, faLock, faPalette, faPen, faSwatchbook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export default function SettingsPage() {
    const { setTitle } = usePageTitle()
    useEffect(() => {
        setTitle('Paramètres')
    }, [setTitle])

    return (
        <div className="settings-page">

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
        </div>
    );
}
