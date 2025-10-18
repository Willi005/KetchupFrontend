import {SideBarIcon} from "../SideBarIcon/SideBarIcon.jsx";
import './SideBar.css'
import {useState} from "react";
import {House, Gear, SignOut} from "@phosphor-icons/react";

function SideBar() {

    const [activeItem, setActiveItem] = useState('home');

    return (
        <aside className={'sidebar-container'}>
            <div className={'sidebar-header'}>
            <div className={'sidebar-logo'}>
                <img src={"src/icons/local-icon.png"} alt="Logo" class/>
            </div>
            </div>

            <nav className={'sidebar-nav'}>
                <SideBarIcon
                    icon={House}
                    isActive={activeItem === 'home'}
                    onClick={() => setActiveItem('home')}
                />
                <SideBarIcon
                    icon={Gear}
                    isActive={activeItem === 'settings'}
                    onClick={() => setActiveItem('settings')}
                />
                <SideBarIcon
                    icon={SignOut}
                    isActive={activeItem === 'logout'}
                    onClick={() => setActiveItem('logout')}
                />
            </nav>

        </aside>
    )
}

export default SideBar