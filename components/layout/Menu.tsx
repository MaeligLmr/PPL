import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Profile } from '@/types/Profile'

export default function Menu({ title = 'Accueil', profile }: { title?: string, profile: Profile | null }) {
    
    const router = useRouter()

    const goHome = () => {
        router.push('/')
    }

    return (
        <nav className="ui-menu">
            <Button variant="plain" onClick={() => goHome()} style={{ padding : 0 }}><h1>PPL</h1></Button>
            <h2>{title}</h2>
            <Link href="/profile"><Avatar profile={profile} dimensions={12} showName={false} /></Link>
        </nav>
    )
}
