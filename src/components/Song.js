import React, {useContext} from 'react'
import StateContext from "../stateContext"
import SongControls from "./SongControls"

const Song = () => {
// Initial State 
    const {state} = useContext(StateContext)
    const activeSong = state.activeSong
    
    return (
        <div>
            <p>{activeSong.artist}</p>
            <img src={activeSong.cover} alt={activeSong.name}/>
            <p>{activeSong.name}</p>
            {activeSong.active ? <p>Active</p> : <p>Inactive</p>}
            <p>Artist: {activeSong.artist}</p>
            <p>ID: {activeSong.id}</p>
            <SongControls/>
        </div>
    )
}

export default Song
