import React, {useContext} from 'react'
import StateContext from "../stateContext"

import { 
    FETCH_ACTIVE_SONG,
} from "../stateActionTypes"

const PlaylistSong = ({song, audioRef}) => {
    const {state, dispatch} = useContext(StateContext)
 
    const selectSongHandler = async () =>{
        let currentIndex = state.songs.findIndex(el => el.id === song.id)
        await dispatch({payload: currentIndex, type: FETCH_ACTIVE_SONG })

         //Play audio
         if (state.songInfo.isPlaying){ 
             audioRef.current.play();
         }
    }

    return (
        <div onClick={selectSongHandler} className="playlist-song-container">
            <div className={song.active ? "active-song playlist-item" : "playlist-item"}>
            <img src={song.cover} alt={song.name}/>
                <ul>
                    <li>{song.name}</li>
                    <li>{song.artist}</li>
                </ul>
            </div>
        </div>
    )
}

export default PlaylistSong
