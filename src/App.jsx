import './App.css'
import SideBar from "./component/SideBar/SideBar.jsx";
import { HomePage } from "./pages/Home/HomePage.jsx";
import { SettingsPage } from "./pages/Settings/SettingsPage.jsx";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard/DashboardPage.jsx";
import { NotifyPage } from "./pages/Notify/NotifyPage.jsx";
import { NotificationsPage } from "./pages/Notifications/NotificationsPage.jsx";
import { LoginPage } from "./pages/Login/LoginPage.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Componente para proteger rutas
function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div style={{color:'white', padding: 20}}>Cargando...</div>;
    }

    if (!isAuthenticated) {
        // Redirigir al login, pero guardando la ubicación intento para volver después
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

// Layout principal que incluye el Sidebar (solo para usuarios logueados)
function MainLayout({ children }) {
    return (
        <div className={'app-container'}>
            <SideBar />
            <main className={'main-content'}>
                {children}
            </main>
        </div>
    );
}

function AppContent() {
    return (
        <Routes>
            {/* Ruta Pública: Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas Privadas: Requieren Auth y usan el Layout con Sidebar */}
            <Route path="/" element={
                <ProtectedRoute>
                    <MainLayout>
                        <HomePage />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <MainLayout>
                        <DashboardPage />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/notify" element={
                <ProtectedRoute>
                    <MainLayout>
                        <NotifyPage />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/notifications" element={
                <ProtectedRoute>
                    <MainLayout>
                        <NotificationsPage />
                    </MainLayout>
                </ProtectedRoute>
            } />

            <Route path="/settings" element={
                <ProtectedRoute>
                    <MainLayout>
                        <SettingsPage />
                    </MainLayout>
                </ProtectedRoute>
            } />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;