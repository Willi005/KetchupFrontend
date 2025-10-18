import './SideBarIcon.css'

export function SideBarIcon({icon: IconComponent, isActive, onClick}) {

    const itemClasses = `food-icon-container ${isActive ? 'active' : ''}`

    return (
        <div className={itemClasses} onClick={onClick}>
            <img className={'food-tab'} src={'src/assets/sidebar-active-item.svg'}></img>
            <div className={'food-icon-frame'}>
                <IconComponent className={'food-icon'}/>
            </div>
        </div>
    )
}