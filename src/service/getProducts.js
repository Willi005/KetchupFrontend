import axios from 'axios';

const API_URL = 'http://localhost:8080/foods';

export async function getProducts() {
    // 1. Recuperamos el token
    const token = localStorage.getItem('token');

    try {
        // 2. Hacemos la petición GET con Axios
        // Axios parsea automáticamente el JSON de respuesta en .data
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        // Axios lanza errores automáticamente para códigos 4xx y 5xx
        console.error("Error fetching products:", error);
        throw error; // Re-lanzamos para que lo maneje el hook
    }
}