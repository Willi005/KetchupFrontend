import { useState, useEffect } from 'react';
import './OrderPanel.css';
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from 'axios';
import { Trash, CreditCard, Money, Wallet } from "@phosphor-icons/react";

export function OrderPanel() {
    const { cartItems, cartTotal, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
    const { user, token } = useAuth();

    // Estado del formulario
    const [clientName, setClientName] = useState('');
    const [paymentType, setPaymentType] = useState('CASH'); // CASH, DEBIT_CARD, CREDIT_CARD
    const [amountPaid, setAmountPaid] = useState('');
    const [kitchenNotes, setKitchenNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Cálculo del vuelto
    const change = (parseFloat(amountPaid) || 0) - cartTotal;
    const isCashPayment = paymentType === 'CASH';

    // Validación para habilitar botón
    const isValid = cartItems.length > 0 &&
        clientName.trim() !== '' &&
        (!isCashPayment || (isCashPayment && change >= 0));

    const handleOrderSubmit = async () => {
        if (!isValid) return;
        setIsSubmitting(true);

        try {
            // Construir el Payload según OrderRequestDto del backend
            const payload = {
                employeeId: user.id,
                clientName: clientName,
                items: cartItems.map(item => ({
                    foodId: item.id,
                    quantity: item.quantity
                })),
                payment: {
                    type: paymentType,
                    // Si no es efectivo, asumimos pago exacto (amountPaid = total)
                    amountPaid: isCashPayment ? parseFloat(amountPaid) : cartTotal
                },
                kitchenNotes: kitchenNotes
            };

            const response = await axios.post('http://localhost:8080/orders', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Éxito
            alert(`Orden creada! Ticket #${response.data.ticketNumber}`);
            clearCart();
            setClientName('');
            setAmountPaid('');
            setKitchenNotes('');

        } catch (error) {
            console.error("Error creating order:", error);
            alert("Error al crear la orden. " + (error.response?.data?.message || ""));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="order-panel">
                <h2 className="order-title">Nueva Orden</h2>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ABBBC2', gap: '20px'}}>
                    <p>Agrega productos para comenzar</p>
                </div>
            </div>
        );
    }

    return (
        <div className="order-panel">
            <h2 className="order-title">Orden Actual</h2>

            {/* Lista de Items */}
            <div className="order-items-list">
                {cartItems.map((item) => (
                    <div className="order-item" key={item.id}>
                        <img src={item.imgUrl} alt={item.name} className="item-image" />

                        <div className="item-details">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">$ {item.price}</span>
                            <div className="item-qty-control">
                                <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                            </div>
                        </div>

                        <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'5px'}}>
                            <span className="item-total-price">$ {item.price * item.quantity}</span>
                            <button
                                style={{background:'none', border:'none', color:'#f56f6f', cursor:'pointer'}}
                                onClick={() => removeFromCart(item.id)}
                            >
                                <Trash size={18} />
                            </button>
                        </div>

                        {/* Nota por item: Podríamos implementarlo en el futuro, por ahora dejamos una nota global */}
                    </div>
                ))}
            </div>

            {/* Footer con Formulario */}
            <div className="order-footer">

                {/* Cliente */}
                <input
                    type="text"
                    placeholder="Nombre del Cliente"
                    className="panel-input"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />

                {/* Notas Cocina */}
                <input
                    type="text"
                    placeholder="Notas para cocina..."
                    className="panel-input"
                    value={kitchenNotes}
                    onChange={(e) => setKitchenNotes(e.target.value)}
                />

                <div className="footer-row">
                    <span className="label">Subtotal</span>
                    <span className="value">$ {cartTotal}</span>
                </div>

                {/* Selección de Pago */}
                <div>
                    <p className="label" style={{marginBottom:'8px', fontSize:'12px'}}>Método de Pago</p>
                    <div className="payment-options">
                        <button
                            className={`payment-btn ${paymentType === 'CASH' ? 'active' : ''}`}
                            onClick={() => setPaymentType('CASH')}
                        >
                            <Money size={24} />
                            Efectivo
                        </button>
                        <button
                            className={`payment-btn ${paymentType === 'DEBIT_CARD' ? 'active' : ''}`}
                            onClick={() => setPaymentType('DEBIT_CARD')}
                        >
                            <Wallet size={24} />
                            Débito
                        </button>
                        <button
                            className={`payment-btn ${paymentType === 'CREDIT_CARD' ? 'active' : ''}`}
                            onClick={() => setPaymentType('CREDIT_CARD')}
                        >
                            <CreditCard size={24} />
                            Crédito
                        </button>
                    </div>
                </div>

                {/* Lógica Específica de Efectivo */}
                {isCashPayment && (
                    <div className="cash-info-box">
                        <input
                            type="number"
                            placeholder="Efectivo Recibido"
                            className="panel-input"
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                        />
                        <div className="footer-row">
                            <span className="label">Vuelto</span>
                            <span className={`value ${change < 0 ? 'error-txt' : ''}`}>
                                $ {change >= 0 ? change : '---'}
                            </span>
                        </div>
                        {change < 0 && amountPaid && <p className="error-txt">Monto insuficiente</p>}
                    </div>
                )}

                <button
                    className="submit-btn"
                    onClick={handleOrderSubmit}
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? 'Procesando...' : `Cobrar $ ${cartTotal}`}
                </button>
            </div>
        </div>
    )
}