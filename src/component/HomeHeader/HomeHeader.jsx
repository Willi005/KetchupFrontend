import './HomeHeader.css';
import { useAuth } from "../../context/AuthContext.jsx";

// 1. Recibimos 'searchQuery' (el texto) y 'onSearch' (la función para cambiarlo)
export function HomeHeader({ searchQuery, onSearch }) {

    const { user } = useAuth();

    const cashierName = user
        ? [user.name, user.secondName].filter(Boolean).join(" ")
        : "Cajero";

    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(today);

    return (
        <header className="home-header">
            <div className="header-info">
                <h1 className="header-title">{cashierName}</h1>
                <p className="header-date">{formattedDate}</p>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for foods or drinks"
                    // 2. Vinculamos el input al estado.
                    // Usamos || '' para asegurar que nunca sea undefined/null
                    value={searchQuery || ''}
                    // 3. Al escribir, llamamos a la función que viene del hook
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
        </header>
    )
}