// ruta: src/component/PaymentPanel/PaymentPanel.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentPanel.css';

export function PaymentPanel({ isOpen, cartItems, subtotal, setCartItems, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estados del formulario
    const [paymentMethod, setPaymentMethod] = useState('DEBIT_CARD');
    const [clientName, setClientName] = useState('Cliente Mostrador');
    const [kitchenNotes, setKitchenNotes] = useState('');

    const handleConfirmPayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const amountPaid = subtotal;

        const itemsDto = cartItems.map(item => ({
            foodId: item.foodId,
            quantity: item.quantity
        }));

        const orderRequestDto = {
            // ⬇⬇ IMPORTANTE: Reemplaza esto con el ID real del empleado logueado
            employeeId: 'ID_DEL_EMPLEADO_LOGUEADO', // TODO: CAMBIAR ESTO
            clientName: clientName,
            kitchenNotes: kitchenNotes,
            items: itemsDto,
            payment: {
                type: paymentMethod,
                amountPaid: amountPaid
            }
        };

        try {
            const response = await axios.post('http://localhost:8080/orders', orderRequestDto);
            alert(`¡Orden #${response.data.ticketNumber} creada con éxito!`);
            setCartItems([]);
            onClose();
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al procesar la orden. Intente de nuevo.';
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    // Resetea el formulario si se cierra el panel
    useEffect(() => {
        if (!isOpen) {
            setError(null);
            setClientName('Cliente Mostrador');
            setKitchenNotes('');
        }
    }, [isOpen]);

    return (
        // El 'aside' ya no necesita clases de animación
        <aside className="payment-panel">
            <div className="payment-panel-inner">
                <h3 className="payment-title">Payment</h3>
                <p className="payment-subtitle">{cartItems.length} items - Total: ${subtotal.toFixed(2)}</p>

                <form className="payment-form" onSubmit={handleConfirmPayment}>
                    <div className="form-group">
                        <label htmlFor="clientName">Cliente</label>
                        <input
                            id="clientName"
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="kitchenNotes">Notas de Cocina</label>
                        <textarea
                            id="kitchenNotes"
                            rows="3"
                            value={kitchenNotes}
                            onChange={(e) => setKitchenNotes(e.target.value)}
                            placeholder="Ej: Sin cebolla, extra picante..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="paymentMethod">Método de Pago</label>
                        <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="DEBIT_CARD">Tarjeta Débito/Crédito</option>
                            <option value="CASH">Efectivo</option>
                            <option value="PAYPAL">Paypal</option>
                        </select>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="payment-buttons">
                        <button type="button" onClick={onClose} className="btn-secondary" disabled={isLoading}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-primary" disabled={isLoading}>
                            {isLoading ? 'Procesando...' : 'Confirmar Pago'}
                        </button>
                    </div>
                </form>
            </div>
        </aside>
    );
}