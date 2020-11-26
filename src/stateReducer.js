import {
    FETCH_ACTIVE_SONG,
    TOOGLE_ACTIVE_SONG,
} from "./stateActionTypes"

const stateReducer = (state, action) =>{
    switch(action.type){
        case FETCH_ACTIVE_SONG:
       
            const selectedSong = state.songs[action.payload]
            const songsNewStatus = state.songs.map(song => {
                        if(song.id !== selectedSong.id){
                            song.active = false
                        } else{
                            song.active = true
                        }
                        return song
                    })
                    console.log("From Reducer fetch active", selectedSong)
                    return {...state, songs: songsNewStatus, activeSong: selectedSong}

        case TOOGLE_ACTIVE_SONG:
            // Find current Song Index
            let currentIndex = state.songs.map(song => {

            })
            // const currentSongActive = !state.activeSong.active
            
            console.log("From Reducer", action.payload)
            return {...state, }

        default:
            return state
    }
}

export default stateReducer