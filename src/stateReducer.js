import {
    FETCH_ACTIVE_SONG,
    TOOGLE_ACTIVE_SONG,
} from "./stateActionTypes"

const stateReducer = (state, action) =>{
    switch(action.type){
        case FETCH_ACTIVE_SONG:
            const selectedSong = state.songs[action.payload]
            const songsActiveStatus = state.songs.map(song => {
                        if(song.id !== selectedSong.id){
                            song.active = false
                        } else{
                            song.active = true
                        }
                        return song
                    })
        return {...state, songs: songsActiveStatus, activeSong: selectedSong}

        default:
            return state
    }
}

export default stateReducer