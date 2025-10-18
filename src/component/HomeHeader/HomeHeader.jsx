import './HomeHeader.css';

export function HomeHeader() {

    return (
        <header className="home-header">
            <div className="header-info">
                <h1 className="header-title">Guillermo Salgado</h1>
                <p className="header-date">Saturday, 18 Oct 2025</p>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search for foods or drinks"/>
            </div>
        </header>
    )
}