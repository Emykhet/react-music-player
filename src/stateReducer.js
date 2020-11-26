import {
    FETCH_ACTIVE_SONG
} from "./stateActionTypes"

const stateReducer = (state, action) =>{
    switch(action.type){
        case FETCH_ACTIVE_SONG:
            const selectedSong = state.songs.filter(song => song.active === true)
            console.log("From Reducer", selectedSong)
            return {...state, activeSong: selectedSong[0]}
        default:
            return state
    }
}

export default stateReducer