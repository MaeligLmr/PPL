import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import './Menu.css'

export default function Menu() {
  return (
    <nav className="ui-menu">
      <Button variant="plain">Accueil</Button>
      <div className="ui-menu-title">Titre</div>
      <Avatar />
    </nav>
  )
}
