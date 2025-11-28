// ruta: src/component/OrderPanel/OrderPanel.jsx

import React from 'react';
import './OrderPanel.css';

// ---------------------------------------------------
// SUBACOMPONENTE para el item del carrito
// ---------------------------------------------------
function CartItem({ item, onUpdateQuantity, onRemove }) {
    return (
        <div className="cart-item">
            <div className="item-info">
                {/* <img src={item.imgUrl} alt={item.name} className="item-image" /> */}
                <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price-small">$ {item.price.toFixed(2)}</span>
                </div>
            </div>

            <input
                type="number"
                className="item-quantity"
                value={item.quantity}
                min="1"
                onChange={(e) => onUpdateQuantity(item.foodId, parseInt(e.target.value))}
            />

            <span className="item-total-price">$ {(item.price * item.quantity).toFixed(2)}</span>

            <button className="item-remove" onClick={() => onRemove(item.foodId)}>
                🗑️
            </button>
        </div>
    );
}

// ---------------------------------------------------
// COMPONENTE PRINCIPAL
// ---------------------------------------------------
export function OrderPanel({ cartItems, setCartItems, onGoToPayment }) {

    const handleUpdateQuantity = (foodId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.foodId === foodId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (foodId) => {
        setCartItems(prevItems => prevItems.filter(item => item.foodId !== foodId));
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="order-panel">
            <h2 className="order-title">Orden Actual</h2>

            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Tu orden está vacía.</p>
            ) : (
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <CartItem
                            key={item.foodId}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="order-summary">
                    <div className="summary-row">
                        <span>Sub total</span>
                        <span>$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>$ {subtotal.toFixed(2)}</span>
                    </div>
                    <button
                        className="btn-primary"
                        onClick={onGoToPayment}
                    >
                        Continue to Payment
                    </button>
                </div>
            )}
        </div>
    );
}