import './FoodCard.css'
import { useCart } from '../../context/CartContext.jsx';

// Recibimos 'id' ahora
export function FoodCard({id, name, price, category, stock, imgUrl}) {

    const { addToCart } = useCart();

    const formattedCategory = category.charAt(0)
        .toUpperCase() + category.slice(1).toLowerCase();

    // Función para manejar el click
    const handleCardClick = () => {
        // Reconstruimos el objeto producto para el carrito
        const product = { id, name, price, category, stock, imgUrl };
        addToCart(product);
    };

    return (
        <div className={'card-container'} onClick={handleCardClick}>
            <img className={'card-image'} src={imgUrl} alt={name}/>
            <div className={'card-info'}>
                <span className={'card-name'}>{name}</span>
                <span className={'card-price'}>$ {price}</span>
                <span className={'card-stock'}>{`${stock} ${formattedCategory}s disponibles`}</span>
            </div>
        </div>
    )
}