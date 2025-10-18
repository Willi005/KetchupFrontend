import './App.css'
import SideBar from "./component/SideBar/SideBar.jsx";
import {HomePage} from "./pages/Home/HomePage.jsx";
import {SettingsPage} from "./pages/Settings/SettingsPage.jsx";
import {Route, Routes} from "react-router-dom";
import {DashboardPage} from "./pages/Dashboard/DashboardPage.jsx";
import {NotifyPage} from "./pages/Notify/NotifyPage.jsx";
import {NotificationsPage} from "./pages/Notifications/NotificationsPage.jsx";

function App() {

    return (

        <div className={'app-container'}>
            <SideBar/>
            <main className={'main-content'}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/dashboard" element={<DashboardPage/>}/>
                    <Route path="/notify" element={<NotifyPage/>}/>
                    <Route path="/notifications" element={<NotificationsPage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;