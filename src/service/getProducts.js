import axios from "axios";
const API_URL = 'http://localhost:8080/foods';


export async function getProducts() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error) {
        console.error("Error fetching foods: ",error.message);

        throw error;
    }
}