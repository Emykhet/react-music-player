import React, {useState, useEffect, useContext, useRef } from "react"
import StateContext from "../stateContext"
import {secToMinFunc} from "../utils/utilFunctions"

import {
    FETCH_ACTIVE_SONG,
    SET_SONG_INFO
} from "../stateActionTypes"

const SongControls = ({audioRef}) => {

// Initial State
    const {state, dispatch} = useContext(StateContext)
    const {songs, activeSong, songTime} = state
    const [songInfo, setSongInfo] = useState({
        isPlaying:false,
        isLoopOne: false,
        isLoopAll: false,
        end: false,
        volume: .7,
    })

    const rangeRef = useRef()
    const volRef = useRef()

    useEffect(()=>{
        dispatch({payload: {...songInfo}, type: SET_SONG_INFO })
        if(songTime){
            rangeRef.current.value = songTime.currentTime 
        }
    }, [songTime, dispatch, songInfo])

// Handlers

    const changeVolumeHandler = (e)=>{
        audioRef.current.volume = e.target.value; 
        setSongInfo({...songInfo, volume: e.target.value}) 
    }
    
    const dragHandler = (e)=>{
        audioRef.current.currentTime = e.target.value
    }

    const playSongHandler = () =>{
        if(songInfo.isPlaying){
            setSongInfo({...songInfo, isPlaying: false})
            audioRef.current.pause()  
        }else{
            setSongInfo({...songInfo, isPlaying: true})
            audioRef.current.play()
        }  
    }

    const loopOneSongHandler = () =>{
        if(songInfo.isLoopOne){
            setSongInfo({...songInfo, isLoopOne: false})
        }else{
            setSongInfo({...songInfo, isLoopOne: true, isLoopAll: false})
        }  
    }

    const loopAllSongsHandler = () =>{
        if(songInfo.isLoopAll){
            setSongInfo({...songInfo, isLoopAll: false})
        }else{
            setSongInfo({...songInfo, isLoopAll: true, isLoopOne: false})
        }  
    }

    const prevNextSongHandler = async (el)=>{
        // Find current Song Index
        let currentIndex = state.songs.findIndex(song => song.id === activeSong.id)

        //   FORWARD
        if(el === "forward"){ 
            currentIndex++
            if((currentIndex) % songs.length === 0){
               currentIndex = 0
            }
            await dispatch({payload: currentIndex, type: FETCH_ACTIVE_SONG }) 
            if(songInfo.isLoopAll || songInfo.isLoopOne){
                return
            }
        }
         //  REWIND
         if(el === "rewind"){ 
            currentIndex--
            if((currentIndex) % songs.length === -1){
                currentIndex = songs.length - 1
                await dispatch({payload: currentIndex, type: FETCH_ACTIVE_SONG }) 
                if (songInfo.isPlaying){
                    audioRef.current.play();
                    return;
                } 
            }
                await dispatch({payload: currentIndex, type: FETCH_ACTIVE_SONG }) 
                if(songInfo.isLoopAll || songInfo.isLoopOne){
                    await audioRef.current.play()
                    return
                }      
        }
            if (songInfo.isPlaying){
                audioRef.current.play();
                return;
            } 
    }

    return (
        <div>
            {songTime && (
                <div className="progressbar-container">
                <input 
                    ref={rangeRef}
                    type="range" 
                    min={0}
                    max={songTime.duration || 0}
                    onChange={dragHandler}
                    name="" id=""/>
                    <p>start: {secToMinFunc(songTime.currentTime || 0)}</p>
                    <p>end:{secToMinFunc(songTime.duration)}</p>
                    <label htmlFor="volume">Volume</label>
                    <input
                        onChange={changeVolumeHandler}
                        ref={volRef}
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                        id="volume"
                    />
                 </div>
            )}
            
            <div className="loop-container">
                <button onClick={loopOneSongHandler} type="submit">LOOP ONE</button>
                <button onClick={loopAllSongsHandler} type="submit">LOOP ALL</button>
            </div>

            <div className="skip-play-container">
            <button onClick={e => prevNextSongHandler("rewind")} type="submit">prev</button>

            <button onClick={playSongHandler}type="submit">play</button>

            <button onClick={e => prevNextSongHandler("forward")} type="submit">next</button>
            </div>
        </div>
    )
}

export default SongControls
