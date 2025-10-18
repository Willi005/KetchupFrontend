import {SideBarIcon} from "../SideBarIcon/SideBarIcon.jsx";
import './SideBar.css'
import {useState} from "react";
import {House, Gear,ProjectorScreenChart,EnvelopeSimple,BellSimple, SignOut} from "@phosphor-icons/react";

function SideBar() {

    const [activeItem, setActiveItem] = useState('home');

    return (
        <aside className={'sidebar-container'}>
            <div className={'sidebar-header'}>
                <div className={'sidebar-logo'}>
                    <img className={'sidebar-logo-img'} src={"src/icons/logo-new.svg"} alt="Logo"/>
                </div>
            </div>

            <nav className={'sidebar-nav'}>
                <SideBarIcon
                    icon={House}
                    isActive={activeItem === 'home'}
                    onClick={() => setActiveItem('home')}
                />
                <SideBarIcon
                    icon={ProjectorScreenChart}
                    isActive={activeItem === 'statistics'}
                    onClick={() => setActiveItem('statistics')}
                />
                <SideBarIcon
                    icon={EnvelopeSimple}
                    isActive={activeItem === 'send-notification'}
                    onClick={() => setActiveItem('send-notification')}
                />
                <SideBarIcon
                    icon={BellSimple}
                    isActive={activeItem === 'notifications'}
                    onClick={() => setActiveItem('notifications')}
                />
                <SideBarIcon
                    icon={Gear}
                    isActive={activeItem === 'settings'}
                    onClick={() => setActiveItem('settings')}
                />
                <SideBarIcon
                    icon={SignOut}
                    isActive={false}
                    onClick={() =>{
                        console.log('Sign out clicked'); //TODO implement sign out
                    }}
                />
            </nav>
        </aside>
    )
}

export default SideBar