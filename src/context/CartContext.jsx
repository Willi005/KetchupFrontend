import { createContext, useContext, useState, useMemo } from 'react';

// Inicializamos con null por buena práctica, pero sin tipos estrictos de TS
const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Agregar producto
    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Usamos .find() que es más limpio y legible
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Si ya existe, aumentamos cantidad (si hay stock)
                if (existingItem.quantity < product.stock) {
                    return prevItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return prevItems; // No agregar si supera stock
            } else {
                // Si no existe, lo agregamos con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Remover producto completo
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Disminuir cantidad
    const decreaseQuantity = (productId) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productId);

            if (existingItem?.quantity > 1) {
                return prevItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            } else {
                // Si es 1 y bajamos, lo eliminamos
                return prevItems.filter(item => item.id !== productId);
            }
        });
    };

    // Limpiar carrito
    const clearCart = () => setCartItems([]);

    // Cálculos derivados
    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            decreaseQuantity,
            clearCart,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);