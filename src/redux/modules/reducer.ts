//reducer를 하나로 합치는 파일

import { combineReducers } from "redux";
import auth from './auth'

const reducer = combineReducers({
    auth
})

export default reducer