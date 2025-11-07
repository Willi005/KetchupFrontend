import { FoodGrid } from "../../component/FoodGrid/FoodGrid.jsx";
import { HomeHeader } from "../../component/HomeHeader/HomeHeader.jsx";
import { CategoriesSlider } from "../../component/CategoriesSlider/CategoriesSlider.jsx";
import { OrderPanel } from "../../component/OrderPanel/OrderPanel.jsx";
import './HomePage.css';
import { useProducts } from "../../hooks/useProducts.js";

export function HomePage() {

    const { products, setCategory, activeCategory, isLoading } = useProducts();

    return (
        <div className="homepage-layout">
            <div className="homepage-main-area">
                <div className="homepage-header-container">
                    <HomeHeader/>
                    {/* 1. Pasamos los valores del hook a los componentes hijos */}
                    <CategoriesSlider
                        activeCategory={activeCategory}
                        onSelectCategory={setCategory}
                    />
                </div>

                <main className="homepage-content-scroller">
                    {/* 2. Manejamos el estado de carga (la buena práctica) */}
                    {isLoading
                        ? <p>Cargando productos...</p>
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