import { error } from "console";
import { createActions, handleActions } from "redux-actions";
import { call, put, select, takeLatest } from "redux-saga/effects";
import BookService from "../../services/BookService";
import { BooksState, BookTypes } from "../../types";





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

export const {getbooks} = createActions("GET_BOOKS",{
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

export function* booksSaga(){
    yield takeLatest(`${prefix}/GET_BOOKS`,getBooksSaga)
}