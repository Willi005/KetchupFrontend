import './CategoriesSlider.css';

const categories = [
    { display: 'All food',   value: 'All food' },
    { display: 'Hamburguer', value: 'BURGER' },
    { display: 'Hot dog',    value: 'HOTDOG' },
    { display: 'Pizza',    value: 'PIZZA' },
    { display: 'Fries',      value: 'FRIE' },
    { display: 'Dessert',    value: 'DESSERT' },
    { display: 'Drink',     value: 'DRINK' }
];

export function CategoriesSlider({ activeCategory, onSelectCategory }) {

    return (
        <nav className="categories-slider">
            {categories.map(category => (
                <button
                    key={category.value}

                    // 1. Se compara el 'activeCategory' (que viene de HomePage) con el value.
                    className={`category-tab ${activeCategory === category.value ? 'active' : ''}`}

                    // 2. Al hacer clic se envía value al componente padre.
                    onClick={() => onSelectCategory(category.value)}>

                    {/* 3. Mostramos el texto 'display' (ej: 'Hamburguer') */}
                    {category.display}
                </button>
            ))}
        </nav>
    )
}