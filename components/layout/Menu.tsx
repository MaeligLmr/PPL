import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import './Menu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'

export default function Menu({ title = 'Accueil' }: { title?: string }) {
    return (
        <nav className="ui-menu">
            <Button variant="icon-plain" icon={<FontAwesomeIcon icon={faHome} />}></Button>
            <div className="ui-menu-title">{title}</div>
            <Avatar />
        </nav>
    )
}
