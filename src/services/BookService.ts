import axios from "axios";
import { BookTypes } from "../types";

const BOOK_API_URL = 'http://api.marktube.tv/v1/book'

export default class BookService{
    public static async getBooks(token:string) : Promise<BookTypes[]> {
        const responce = await axios.get(BOOK_API_URL,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return responce.data
    }
}