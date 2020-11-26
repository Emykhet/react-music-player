import React, {useState, useEffect, useContext } from "react"
import StateContext from "../stateContext"
import {
    FETCH_ACTIVE_SONG,
    TOOGLE_ACTIVE_SONG,
} from "../stateActionTypes"

const SongControls = () => {
    const {state, dispatch} = useContext(StateContext)
    const activeSong = state.activeSong
    const songs = state.songs
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        duraratonPercentage: 0,
        volume: 0,
        end: false,
    })

    const prevNextSongHandler = (el)=>{
        // Find current Song Index
        let currentIndex = state.songs.findIndex(song => song.id === activeSong.id)

        //   FORWARD
        if(el === "forward"){ 
            currentIndex++
            dispatch({payload: currentIndex, type: FETCH_ACTIVE_SONG })         
        }
         //  REWIND
         if(el === "rewind"){ 
            currentIndex--
            dispatch({payload: currentIndex, type: FETCH_ACTIVE_SONG })         
        }
    }

    return (
        <div>
            <div className="progressbar-container">
               <input 
                type="range" 
                min={0}
                max={100}/>
                <p>start: </p>
                <p>end:</p>
                <label htmlFor="volume">Volume</label>
                <input
                    max="1"
                    min="0"
                    step="0.01"
                    type="range"
                    id="volume"
                />
             </div>
            
            <div className="loop-container">
                <button type="submit">LOOP ONE</button>
                <button type="submit">LOOP ALL</button>
            </div>

            <div className="skip-play-container">
            <button onClick={e => prevNextSongHandler("rewind")} type="submit">prev</button>

            <button type="submit">play</button>

            <button onClick={e => prevNextSongHandler("forward")} type="submit">next</button>
            </div>
        </div>
    )
}

export default SongControls
