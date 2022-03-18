//reducer를 하나로 합치는 파일

import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import books from "./books"
import auth from './auth'

const reducer = (history : History<unknown>) => combineReducers({
    auth,
    books,
    router: connectRouter(history)
})

export default reducer