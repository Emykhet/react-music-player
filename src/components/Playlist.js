import React, {useContext, useState} from 'react'
import StateContext from "../stateContext"

import PlaylistSong from "./PlaylistSong"

const PlayList = ({audioRef}) => {
    const {state} = useContext(StateContext)
    const songs = state.songs
    return (
        <div>
            {songs.map(song =>(
                <PlaylistSong
                song={song}
                key={song.id}
                audioRef={audioRef}
                />
            ))}
        </div>
    )
}

export default PlayList


