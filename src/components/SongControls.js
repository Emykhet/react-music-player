import React, {useDispatch, useContext } from "react"
import StateContext from "../stateContext"
import {FETCH_ACTIVE_SONG} from "../stateActionTypes"

const SongControls = () => {
    const {state, dispatch} = useContext(StateContext)
    const activeSongHandler = (e)=>{
        e.preventDefault()
        dispatch({type: FETCH_ACTIVE_SONG})
    }
    
    return (
        <div>
            <button onClick={activeSongHandler}>ACTIVE SONG</button>
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
            <button  type="submit">prev</button>

            <button type="submit">play</button>

            <button type="submit">next</button>
            </div>
        </div>
    )
}

export default SongControls
