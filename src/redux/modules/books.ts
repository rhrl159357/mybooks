import { push } from "connected-react-router";
import { error } from "console";
import { Action } from "redux";
import { createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import BookService from "../../services/BookService";
import { BookReqType, BooksState, BookTypes } from "../../types";





const initialState: BooksState = {
    books: null,
    loading : false,
    error: null,
}

const prefix = "my-books/books"

export const {pending , success, fail} = createActions('PENDING','SUCCESS', 'FAIL', {prefix})

const reducer = handleActions<BooksState,BookTypes[]>({
    PENDING:(state) => ({...state,loading:true, error:null}),
    SUCCESS:(state, action)=> ({books: action.payload, loading:false,error:null}),
    FAIL:(state, action:any)=> ({...state, loading:false,error:action.payload}),
},initialState,{prefix})


export default reducer

//saga

export const {getbooks, addBook, deleteBook} = createActions("GET_BOOKS","ADD_BOOK","DELETE_BOOK",{
    prefix 
})

function* getBooksSaga(){
    try {
        yield put(pending())
        const token: string = yield select(state => state.auth.token)
        const books: BookTypes[] = yield call(BookService.getBooks,token)
        yield put(success(books))
    } catch (e) {
        yield put(fail(new Error("Unknown error"  )))
    }
}
function* AddBookSaga(action: Action<BookReqType>){
    try {
        yield put(pending())
        const token: string = yield select(state => state.auth.token)
        const book:BookTypes = yield call((BookService.addBook, token, action.payload))
        const books:BookTypes[] = yield select((state => state.books.books))
        yield put(success({...books, book}))
        yield put(push("/"))
    } catch (e) {
        yield put(fail(e))
    }
}
function* DeleteBookSaga(action: Action<number>){
    try {
        const bookId = action.payload
        yield put(pending());
        const token:string = yield select(state=> state.auth.token)
        yield call(BookService.deleteBook,token,bookId)
        const books:BookTypes[] = yield select(state=>state.books.books)
        yield put(success(books.filter(book => book.bookId !== bookId)))
    } catch (e) {
        yield put(fail(e))
    }
}

export function* booksSaga(){
    yield takeLatest(`${prefix}/GET_BOOKS`,getBooksSaga)
    yield takeEvery(`${prefix}/ADD_BOOK`,AddBookSaga)
    yield takeEvery(`${prefix}/DELETE_BOOK`,DeleteBookSaga)
}