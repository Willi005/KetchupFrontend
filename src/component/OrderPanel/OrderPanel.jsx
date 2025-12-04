import { useState, useEffect } from 'react';
import './OrderPanel.css';
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from 'axios';
import { Trash, CreditCard, Money, Wallet } from "@phosphor-icons/react";

export function OrderPanel() {
    const { cartItems, cartTotal, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
    const { user, token } = useAuth();

    const [clientName, setClientName] = useState('');
    const [paymentType, setPaymentType] = useState('CASH');
    const [amountPaid, setAmountPaid] = useState('');
    const [kitchenNotes, setKitchenNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [nextTicketNumber, setNextTicketNumber] = useState(0);

    const fetchNextOrderNumber = async () => {
        try {
            const response = await axios.get('http://localhost:8080/orders', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNextTicketNumber(response.data.length + 1);
        } catch (error) {
            console.error("Error fetching orders count:", error);
        }
    };

    useEffect(() => {
        if(token) {
            fetchNextOrderNumber();
        }
    }, [token]);

    const change = (parseFloat(amountPaid) || 0) - cartTotal;
    const isCashPayment = paymentType === 'CASH';

    const isValid = cartItems.length > 0 &&
        clientName.trim() !== '' &&
        (!isCashPayment || (isCashPayment && change >= 0));

    const formattedTicket = `#${nextTicketNumber.toString().padStart(5, '0')}`;

    const handleOrderSubmit = async () => {
        if (!isValid) return;
        setIsSubmitting(true);

        try {
            const payload = {
                employeeId: user.id,
                clientName: clientName,
                items: cartItems.map(item => ({
                    foodId: item.id,
                    quantity: item.quantity
                })),
                payment: {
                    type: paymentType,
                    amountPaid: isCashPayment ? parseFloat(amountPaid) : cartTotal
                },
                kitchenNotes: kitchenNotes
            };

            const response = await axios.post('http://localhost:8080/orders', payload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            alert(`Order created successfully! Ticket #${response.data.ticketNumber}`);

            // --- NUEVO: Abrir ticket en nueva pestaña para imprimir ---
            const orderId = response.data.id;
            printTicket(orderId);
            // --------------------------------------------------------

            clearCart();
            setClientName('');
            setAmountPaid('');
            setKitchenNotes('');
            setNextTicketNumber(prev => prev + 1);

        } catch (error) {
            console.error("Error creating order:", error);
            alert("Error al crear la orden. " + (error.response?.data?.message || ""));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Función auxiliar para descargar y abrir el PDF
    const printTicket = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:8080/orders/${orderId}/ticket`, {
                headers: { 'Authorization': `Bearer ${token}` },
                responseType: 'blob' // Importante para recibir el PDF correctamente
            });

            // Crear una URL temporal para el archivo PDF
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = window.URL.createObjectURL(pdfBlob);

            // Abrir en nueva ventana e imprimir automáticamente
            const printWindow = window.open(pdfUrl, '_blank');
            if (printWindow) {
                // Pequeño timeout para asegurar que cargue antes de lanzar print
                printWindow.onload = () => {
                    setTimeout(() => printWindow.print(), 500);
                };
            }
        } catch (error) {
            console.error("Error imprimiendo ticket:", error);
            alert("Orden guardada, pero no se pudo generar el ticket.");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="order-panel">
                <h2 className="order-title">New Order</h2>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ABBBC2', gap: '20px'}}>
                    <p>Add products to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="order-panel">
            <h2 className="order-title">Order number {formattedTicket}</h2>

            <div className="order-items-list">
                {cartItems.map((item) => (
                    <div className="order-item" key={item.id}>
                        <img src={item.imgUrl} alt={item.name} className="item-image" />

                        <div className="item-details">
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">$ {item.price} Per unit</span>
                            <div className="item-qty-control">
                                <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                                <span className="qty-value">{item.quantity}</span>
                                <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                            </div>
                        </div>

                        <div className="item-actions">
                            <span className="item-total-price">$ {item.price * item.quantity}</span>
                            <button
                                style={{background:'none', border:'none', color:'#f56f6f', cursor:'pointer', padding: 0}}
                                onClick={() => removeFromCart(item.id)}
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="order-footer">

                <input
                    type="text"
                    placeholder="Customer name"
                    className="panel-input"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Kitchen notes"
                    className="panel-input"
                    style={{fontSize: '14px'}}
                    value={kitchenNotes}
                    onChange={(e) => setKitchenNotes(e.target.value)}
                />

                <div className="footer-row">
                    <span className="label">Subtotal</span>
                    <span className="value">$ {cartTotal}</span>
                </div>

                <div>
                    <p className="label" style={{marginBottom:'8px', fontSize:'12px'}}>Payment method</p>
                    <div className="payment-options">
                        <button
                            className={`payment-btn ${paymentType === 'CASH' ? 'active' : ''}`}
                            onClick={() => setPaymentType('CASH')}
                        >
                            <Money size={24} />
                            Cash
                        </button>
                        <button
                            className={`payment-btn ${paymentType === 'DEBIT_CARD' ? 'active' : ''}`}
                            onClick={() => setPaymentType('DEBIT_CARD')}
                        >
                            <Wallet size={24} />
                            Debit
                        </button>
                        <button
                            className={`payment-btn ${paymentType === 'CREDIT_CARD' ? 'active' : ''}`}
                            onClick={() => setPaymentType('CREDIT_CARD')}
                        >
                            <CreditCard size={24} />
                            Credit
                        </button>
                    </div>
                </div>

                {isCashPayment && (
                    <div className="cash-info-box">
                        <input
                            type="number"
                            placeholder="Cash received"
                            className="panel-input"
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                            onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                        />
                        <div className="footer-row">
                            <span className="label">Change</span>
                            <span className={`value ${(amountPaid && change < 0) ? 'error-txt' : ''}`}>
                                $ {amountPaid ? (change >= 0 ? change : '-') : '0'}
                            </span>
                        </div>
                        {change < 0 && amountPaid && <p className="error-txt">Insufficient mount</p>}
                    </div>
                )}

                <button
                    className="submit-btn"
                    onClick={handleOrderSubmit}
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : `Charge $ ${cartTotal}`}
                </button>
            </div>
        </div>
    )
}