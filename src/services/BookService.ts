import axios from "axios";
import { BookReqType, BookTypes } from "../types";

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
    public static async addBook(
        token:string, book:BookReqType
    ):Promise<BookTypes>{
        const response = await axios.post(BOOK_API_URL, book,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    }
    public static async deleteBook(
        token:string, bookId:number
    ){
        const response = await axios.delete(`${BOOK_API_URL}/${bookId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data
    }
}