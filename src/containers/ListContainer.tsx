import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../compoment/List";
import { BookTypes, RootState } from "../types";
import {getbooks as getBooksSagaStart, deleteBook as deleteBookSagaStart} from "../redux/modules/books"
import { logout as logoutSagaStart } from "../redux/modules/auth";
import { push } from "connected-react-router";

export default function ListContainer() {

    const books = useSelector<RootState,BookTypes[] | null>((state) => state.books.books)

    const loading = useSelector<RootState, boolean>(
        (state) => state.books.loading
    )
    // const error = useSelector<RootState, Error | null>(
    //     (state) => state.books.error
    // )

    const dispatch = useDispatch()

    // const logout = useCallback(() =>{
    //     dispatch(logoutSagaStart)
    // },[dispatch])

        const getBooks = useCallback(() => {
            dispatch(getBooksSagaStart())
        },[dispatch])

        const goAdd = useCallback(() => {
            dispatch(push("/add"))
        },[dispatch])
        const deleteBook = useCallback((bookId:number) => {
            dispatch(deleteBookSagaStart(bookId))
        },[dispatch])

    return <List books={books} loading={loading}
    goAdd={goAdd}
    deleteBook={deleteBook}
    //getBooks={getBooks} 
    //error={error}
    //logout={logout}
    />
}

