import './SideBarIcon.css'

export function SideBarIcon({icon: IconComponent, isActive, onClick}) {

    const itemClasses = `food-icon-container ${isActive ? 'active' : ''}`

    return(
        <div className={itemClasses} onClick={onClick}>
        <div className={'food-icon-frame'}>
        <IconComponent className={'food-icon'}/>
        </div>
        </div>
    )
}