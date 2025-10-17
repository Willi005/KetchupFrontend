const API_URL = 'http://localhost:8080/products';

export async function getProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}