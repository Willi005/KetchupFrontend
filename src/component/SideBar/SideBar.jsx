import {SideBarIcon} from "../SideBarIcon/SideBarIcon.jsx";
import './SideBar.css'
import {Link, useLocation} from 'react-router-dom';
import {House, Gear, ProjectorScreenChart, EnvelopeSimple, BellSimple, SignOut} from "@phosphor-icons/react";

function SideBar() {

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside className={'sidebar-container'}>
            <div className={'sidebar-header'}>
                <div className={'sidebar-logo'}>
                    <img className={'sidebar-logo-img'} src={"src/icons/logo-new.svg"} alt="Logo"/>
                </div>
            </div>

            <nav className={'sidebar-nav'}>

                <Link to="/">
                    <SideBarIcon
                        icon={House}
                        isActive={currentPath === '/'}
                    />
                </Link>

                <Link to="/dashboard">
                    <SideBarIcon
                        icon={ProjectorScreenChart}
                        isActive={currentPath === '/dashboard'}
                    />
                </Link>

                <Link to="/notify">
                    <SideBarIcon
                        icon={EnvelopeSimple}
                        isActive={currentPath === '/notify'}
                    />
                </Link>

                <Link to="/notifications">
                    <SideBarIcon
                        icon={BellSimple}
                        isActive={currentPath === '/notifications'}
                    />
                </Link>

                <Link to="/settings">
                    <SideBarIcon
                        icon={Gear}
                        isActive={currentPath === '/settings'}
                    />
                </Link>

                <SideBarIcon
                    icon={SignOut}
                    isActive={false}
                    onClick={() => {
                        console.log('Sign out clicked'); //TODO implement sign out
                    }}
                />
            </nav>
        </aside>
    )
}

export default SideBar