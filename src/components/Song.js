import React, {useContext} from 'react'
import StateContext from "../stateContext"
import SongControls from "./SongControls"

const Song = () => {
// Initial State 
    const {state} = useContext(StateContext)
    const activeSong = state.activeSong
    
    return (
        <div>
            <img src={activeSong.cover} alt={activeSong.name}/>
            <p>{activeSong.name}</p>
            <p>{activeSong.artist}</p>
            <SongControls/>
        </div>
    )
}

export default Song
