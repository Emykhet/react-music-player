import React, {useState, useEffect, useContext, useRef } from "react"
import StateContext from "../stateContext"
import {
    FETCH_ACTIVE_SONG,
} from "../stateActionTypes"

const SongControls = () => {
// Initial State
    const {state, dispatch} = useContext(StateContext)
    const activeSong = state.activeSong
    const songs = state.songs
    const [songAudio, setsongAudio] = useState({
        isPlaying:false,
        loopOne: false,
        loopAll: false,
        end: false,
        currentTime: 0,
        duration: 0,
        duraratonPercentage: 0,
        volume: 0,
    })
    const audioRef = useRef()
    
// Handlers
    const playSongHandler = () =>{
        if(!songAudio.isPlaying){
            setsongAudio({...songAudio, isPlaying: true})
            audioRef.current.play()
        }else{
            setsongAudio({...songAudio, isPlaying: false})
            audioRef.current.pause()
        }    
    }

    const prevNextSongHandler = (el)=>{
        // Find current Song Index
        let currentIndex = state.songs.findIndex(song => song.id === activeSong.id)

        //   FORWARD
        if(el === "forward"){ 
            currentIndex++
            if((currentIndex) % songs.length === 0){
               currentIndex = 0
            }
            setsongAudio({...songAudio, isPlaying: false})
            dispatch({payload: currentIndex, type: FETCH_ACTIVE_SONG })         
        }
         //  REWIND
         if(el === "rewind"){ 
            currentIndex--
            if((currentIndex) % songs.length === -1){
                currentIndex = songs.length - 1
            }
            setsongAudio({...songAudio, isPlaying: false})
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

            <button onClick={playSongHandler}type="submit">play</button>

            <button onClick={e => prevNextSongHandler("forward")} type="submit">next</button>
            </div>
            <audio 
            ref={audioRef} 
            src={activeSong.audio}
            />
        </div>
    )
}

export default SongControls
