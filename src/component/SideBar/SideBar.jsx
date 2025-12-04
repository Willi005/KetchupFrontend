import {SideBarIcon} from "../SideBarIcon/SideBarIcon.jsx";
import './SideBar.css'
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {House, Gear, ProjectorScreenChart, EnvelopeSimple, BellSimple, SignOut} from "@phosphor-icons/react";
import { useAuth } from "../../context/AuthContext.jsx";

function SideBar() {

    const location = useLocation();
    const currentPath = location.pathname;

    // 1. Obtenemos la función logout del contexto y el hook de navegación
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        // 2. Ejecutamos la limpieza de sesión
        logout();
        // 3. Redirigimos al usuario a la pantalla de login
        navigate('/login');
    };

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

                {/* 4. Conectamos el evento onClick al botón de salir */}
                <SideBarIcon
                    icon={SignOut}
                    isActive={false}
                    onClick={handleSignOut}
                />
            </nav>
        </aside>
    )
}

export default SideBar