import axios from "axios";

export default async function FetchByISBN(isbn: string){
    const encodedQuery = encodeURIComponent(isbn);
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodedQuery}`;
    console.log(url)
    try {
        const response = await axios.get(url)
        console.log(response.data.items)
        return response.data.items;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching books:', error.message);
        } else {
            console.error("Unknown Error", error)
        }
    }
    
}