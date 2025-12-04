import { FoodCard } from "../FoodCard/FoodCard.jsx";
import './FoodGrid.css'

export function FoodGrid({ products }) {
    return (
        <div className={'food-grid'}>
            {
                products.map(product => (
                    <FoodCard
                        key={product.id}
                        id={product.id} // IMPORTANTE: Pasamos el ID explícitamente
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        stock={product.stock}
                        imgUrl={product.image}
                    />
                ))
            }
        </div>
    )
}