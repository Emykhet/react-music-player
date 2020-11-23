import {combineReducers} from "redux"

import {fetchSongReducer} from "./songReducers"

const allReducers = combineReducers({
    songList: fetchSongReducer,
})

export default allReducers