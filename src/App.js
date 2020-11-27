import React, {useContext, useReducer, useState, useRef, useEffect} from "react"
import StateContext from "./stateContext"
import stateReducer from "./stateReducer"

import {
  SET_SONG_TIME,
  FETCH_ACTIVE_SONG
} from "./stateActionTypes"

// Components
import Song from "./components/Song"
import Playlist from "./components/Playlist"
import SongControls from "./components/SongControls"
// Styles
import "./App.css"

function App() {

  const initialState = useContext(StateContext)
  const [state, dispatch] = useReducer(stateReducer, initialState)

  const [showPlayList, setShowPlaylist] = useState(false)

  // ************
  const {songs, songInfo, activeSong }= state
  const audioRef = useRef()
  const [songTime, setSongTime] = useState({
    currentTime: 0,
    duration: 0,
    durationPercentage: 0,
})

useEffect(()=>{
  dispatch({payload: {...songTime}, type: SET_SONG_TIME })
}, [songTime])

  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime
    const duration = e.target.duration

    //  Calculate Percentage
    const currentRounded = Math.round(current)
    const durationRounded = Math.round(duration)
    const percentage = Math.round((currentRounded / durationRounded) * 100)
    setSongTime({...songTime, currentTime: current, duration:duration, percentage:percentage})
}

  const songEndTimeHandler = async()=>{
    let currentIndex = state.songs.findIndex(song => song.id === activeSong.id)
    if(songInfo.isLoopOne){
        audioRef.current.play()
    }
    if(songInfo.isLoopAll){
        currentIndex++
        await dispatch({payload: currentIndex, type: FETCH_ACTIVE_SONG }) 
        audioRef.current.play()
        if((currentIndex) % songs.length === 0){
           currentIndex = 0
           audioRef.current.play()
        }
    }
}

  const showPlaylistHandler = ()=>{
    setShowPlaylist(!showPlayList)
  }

  return (
    <div className="App">
      <h2>App</h2>
      <StateContext.Provider value={{state, dispatch}}>
        <button onClick={showPlaylistHandler}>Playlist</button>
        <div className="player">
        <Song />
        <SongControls audioRef={audioRef}/>
        {showPlayList && <Playlist audioRef={audioRef}/> }
        </div>
        <audio 
            ref={audioRef} 
            src={activeSong.audio}
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler}
            onEnded={songEndTimeHandler} 
            />
      </StateContext.Provider>
    </div>
  );
}

export default App;
