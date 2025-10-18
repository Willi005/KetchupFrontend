import {useEffect, useState} from "react";
import {getProducts} from "../../service/getProducts.js";
import {FoodCard} from "../FoodCard/FoodCard.jsx";
import './FoodGrid.css'

export function FoodGrid() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts().then(data => {
            setProducts(data);
        })
    }, []);

    return (
        <div className={'food-grid'}>
            {
                products.map(product => (
                    <FoodCard key={product.id}
                              name={product.name}
                              price={product.price}
                              category={product.category}
                              stock={product.stock}
                              imgUrl={product.imageUrl}
                    />
                ))
            }
            { //pormientrasnomas
                products.map(product => (
                    <FoodCard key={product.id}
                              name={product.name}
                              price={product.price}
                              category={product.category}
                              stock={product.stock}
                              imgUrl={product.imageUrl}
                    />
                ))
            }
            { //pormientrasnomas
                products.map(product => (
                    <FoodCard key={product.id}
                              name={product.name}
                              price={product.price}
                              category={product.category}
                              stock={product.stock}
                              imgUrl={product.imageUrl}
                    />
                ))
            }
        </div>
    )
}
