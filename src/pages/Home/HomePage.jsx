import { FoodGrid } from "../../component/FoodGrid/FoodGrid.jsx";
import { HomeHeader } from "../../component/HomeHeader/HomeHeader.jsx";
import { CategoriesSlider } from "../../component/CategoriesSlider/CategoriesSlider.jsx";
import { OrderPanel } from "../../component/OrderPanel/OrderPanel.jsx";
import './HomePage.css';
import { useProducts } from "../../hooks/useProducts.js";

export function HomePage() {

    // 1. Extraemos las propiedades de búsqueda del hook useProducts
    const {
        products,
        setCategory,
        activeCategory,
        isLoading,
        searchQuery,     // <--- Estado del texto
        setSearchQuery   // <--- Función para actualizarlo
    } = useProducts();

    return (
        <div className="homepage-layout">
            <div className="homepage-main-area">
                <div className="homepage-header-container">
                    {/* 2. Se las pasamos al HomeHeader */}
                    <HomeHeader
                        searchQuery={searchQuery}
                        onSearch={setSearchQuery}
                    />

                    <CategoriesSlider
                        activeCategory={activeCategory}
                        onSelectCategory={setCategory}
                    />
                </div>

                <main className="homepage-content-scroller">
                    {isLoading
                        ? <p style={{padding: '24px'}}>Cargando productos...</p>
                        : <FoodGrid products={products} />
                    }
                </main>
            </div>

            <aside className="homepage-order-panel-wrapper">
                <OrderPanel/>
            </aside>
        </div>
    )
}