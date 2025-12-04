import { useState, useEffect, useMemo, useCallback } from 'react';
import { getProducts } from '../service/getProducts.js';

export function useProducts() {

    // Estado para la lista completa de productos, sin filtrar
    const [allProducts, setAllProducts] = useState([]);

    // Estado para el criterio de filtro (la categoría seleccionada)
    const [activeCategory, setActiveCategory] = useState('All food');

    // Nuevo: Estado para la búsqueda de texto
    const [searchQuery, setSearchQuery] = useState('');

    // Estado de carga (buena práctica :3)
    const [isLoading, setIsLoading] = useState(true);

    const refreshProducts = useCallback(() => {
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

    useEffect(() => {
        refreshProducts();
    }, [refreshProducts]);

    // Este useMemo recalcula la lista si 'allProducts', 'activeCategory' o 'searchQuery' cambian.
    const filteredProducts = useMemo(() => {
        let result = allProducts;

        // 1. Filtro por Categoría
        if (activeCategory !== 'All food') {
            result = result.filter(product => product.category === activeCategory);
        }

        // 2. Filtro por Texto (Búsqueda) - Insensible a mayúsculas/minúsculas
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(query)
            );
        }

        return result;
    }, [allProducts, activeCategory, searchQuery]);

    // Finalmente se devuelve toodo lo que un componente pueda necesitar
    return {
        products: filteredProducts,  // La lista ya filtrada
        setCategory: setActiveCategory, // La función para cambiar el filtro de categoría
        activeCategory: activeCategory, // El filtro actual de categoría
        setSearchQuery: setSearchQuery, // Función para actualizar la búsqueda
        searchQuery: searchQuery,       // El texto de búsqueda actual
        isLoading: isLoading,        // El estado de carga
        refreshProducts
    };
}