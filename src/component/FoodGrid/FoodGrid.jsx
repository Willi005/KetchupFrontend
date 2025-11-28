import { FoodCard } from "../FoodCard/FoodCard.jsx";
import './FoodGrid.css'

export function FoodGrid({ products, onAddToCart }) {
    return (
        <div className={'food-grid'}>
            {
                products.map(product => (
                    <FoodCard key={product.id}
                              name={product.name}
                              price={product.price}
                              category={product.category}
                              stock={product.stock}
                              imgUrl={product.image}
                              onClick={() => onAddToCart(product)}
                    />
                ))
            }
        </div>
    )
}