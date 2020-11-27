import {
    FETCH_ACTIVE_SONG,
    SET_SONG_INFO,
    SET_SONG_TIME,
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
        
        case SET_SONG_INFO:
        return {...state, songInfo: action.payload}

        case SET_SONG_TIME:
        return {...state, songTime: action.payload}

        default:
            return state
    }
}

export default stateReducer