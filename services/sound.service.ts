import { getProfile } from './profile.service';

class SoundService {
    private cachedProfile: { premium: boolean; son: string | null } | null = null;
    private lastCacheTime = 0;
    private cacheTimeout = 30000; // 30 secondes

    private async getCachedProfile() {
        const now = Date.now();
        if (!this.cachedProfile || (now - this.lastCacheTime) > this.cacheTimeout) {
            try {
                const profile = await getProfile();
                this.cachedProfile = { premium: profile.premium, son: profile.son };
                this.lastCacheTime = now;
            } catch (error) {
                console.error('Erreur lors de la récupération du profil:', error);
                return null;
            }
        }
        return this.cachedProfile;
    }

    async playUserSound() {
        try {
            const profile = await this.getCachedProfile();
            // Vérifier si l'utilisateur est premium avant de jouer le son
            if (profile?.premium && profile.son) {
                this.playSound(profile.son);
            }
            // Si l'utilisateur n'est pas premium ou n'a pas de son, on ne joue rien
        } catch (error) {
            console.error('Erreur lors de la lecture du son utilisateur:', error);
        }
    }

    playSound(fileName: string) {
        try {
            const audio = new Audio(`/PPL/sound/${fileName}`);
            audio.volume = 0.5; // Volume à 50%
            audio.play().catch(err => {
                console.error(`Erreur lors de la lecture du son ${fileName}:`, err);
            });
        } catch (error) {
            console.error(`Erreur lors de la création de l'audio ${fileName}:`, error);
        }
    }

    // Méthode pour invalider le cache (à appeler après mise à jour du profil)
    invalidateCache() {
        this.cachedProfile = null;
        this.lastCacheTime = 0;
    }
}

// Instance singleton
export const soundService = new SoundService();

// Export de fonctions pour faciliter l'utilisation
export const playUserSound = () => soundService.playUserSound();
export const playSound = (fileName: string) => soundService.playSound(fileName);
export const invalidateSoundCache = () => soundService.invalidateCache();
