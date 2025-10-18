import {useState} from 'react';
import './CategoriesSlider.css';

const categories = ['All food', 'Hamburguer', 'Hot dog', 'Fries', 'Dessert', 'Drinks'];

export function CategoriesSlider() {
    const [activeCategory, setActiveCategory] = useState('All food');

    return (
        <nav className="categories-slider">
            {categories.map(category => (
                <button
                    key={category}
                    className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}>
                    {category}
                </button>
            ))}
        </nav>
    )
}