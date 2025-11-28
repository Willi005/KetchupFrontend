// ruta: src/pages/home/HomePage.jsx

import { useState } from 'react';
import { FoodGrid } from "../../component/FoodGrid/FoodGrid.jsx";
import { HomeHeader } from "../../component/HomeHeader/HomeHeader.jsx";
import { CategoriesSlider } from "../../component/CategoriesSlider/CategoriesSlider.jsx";
import { OrderPanel } from "../../component/OrderPanel/OrderPanel.jsx";
import { PaymentPanel } from '../../component/PaymentPanel/PaymentPanel.jsx';
import './HomePage.css';
import { useProducts } from "../../hooks/useProducts.js";

export function HomePage() {
    // Tu hook de productos
    const { products, setCategory, activeCategory, isLoading } = useProducts();

    // Estado del carrito
    const [cartItems, setCartItems] = useState([]);

    // Estado que controla la visibilidad del panel de pago
    const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(false);

    /**
     * Añade un producto al carrito.
     * Si ya existe, incrementa la cantidad.
     */
    const handleAddToCart = (productToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.foodId === productToAdd.id);

            if (existingItem) {
                // Si existe, actualiza la cantidad
                return prevItems.map(item =>
                    item.foodId === productToAdd.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si es nuevo, añádelo
                return [
                    ...prevItems,
                    {
                        foodId: productToAdd.id,
                        name: productToAdd.name,
                        price: productToAdd.price,
                        quantity: 1
                        // imgUrl: productToAdd.imgUrl // (Añade si lo tienes)
                    }
                ];
            }
        });
    };

    // Calculamos el subtotal aquí para pasarlo al panel de pago
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="homepage-layout">

            {/* 1. ÁREA PRINCIPAL (La grilla) */}
            {/* Esta área se queda estática y no es afectada por el panel */}
            <div className="homepage-main-area">
                <div className="homepage-header-container">
                    <HomeHeader/>
                    <CategoriesSlider
                        activeCategory={activeCategory}
                        onSelectCategory={setCategory}
                    />
                </div>
                <main className="homepage-content-scroller">
                    {isLoading
                        ? <p>Cargando productos...</p>
                        : <FoodGrid
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    }
                </main>
            </div>

            {/* 2. BACKDROP (Oscurece la grilla) */}
            {/* Se activa con la clase 'is-open' */}
            <div
                className={`backdrop-overlay ${isPaymentPanelOpen ? 'is-open' : ''}`}
                onClick={() => setIsPaymentPanelOpen(false)}
            />

            {/* 3. CONTENEDOR DESLIZANTE (Contiene AMBOS paneles) */}
            {/* Este es el 'div' que se anima con 'transform' */}
            <div className={`sliding-panel-container ${isPaymentPanelOpen ? 'is-open' : ''}`}>

                {/* Panel 1: El Carrito */}
                <OrderPanel
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    onGoToPayment={() => setIsPaymentPanelOpen(true)}
                />

                {/* Panel 2: El Pago */}
                <PaymentPanel
                    isOpen={isPaymentPanelOpen} // Para el 'useEffect' interno
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    subtotal={subtotal}
                    onClose={() => setIsPaymentPanelOpen(false)}
                />
            </div>
        </div>
    )
}