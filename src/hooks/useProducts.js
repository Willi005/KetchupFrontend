import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../service/getProducts.js';

export function useProducts() {

    // Estado para la lista completa de productos, sin filtrar
    const [allProducts, setAllProducts] = useState([]);

    // Estado para el criterio de filtro (la categoría seleccionada)
    const [activeCategory, setActiveCategory] = useState('All food');

    // Estado de carga (buena práctica :3)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getProducts()
            .then(data => {
                setAllProducts(data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Este useMemo recalcula la lista !!solo!! si 'allProducts' o 'activeCategory' cambian.
    const filteredProducts = useMemo(() => {
        if (activeCategory === 'All food') {
            return allProducts;
        }
        return allProducts.filter(product => product.category === activeCategory);
    }, [allProducts, activeCategory]); // Dependencias

    // Finalmente se devuelve toodo lo que un componente pueda necesitar
    return {
        products: filteredProducts,  // La lista ya filtrada
        setCategory: setActiveCategory, // La función para cambiar el filtro
        activeCategory: activeCategory, // El filtro actual (para el slider)
        isLoading: isLoading        // El estado de carga
    };
}