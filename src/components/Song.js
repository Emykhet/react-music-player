import React, { useEffect, useRef, useState } from "react"
import songDatabase from "../songDatabase"

const Song = () => {
// Initial State 
    const audioRef = useRef()
    const rangeRef = useRef()
    const [songs, setSongs] = useState(songDatabase())
    const [volume, setVolume] = useState(0)
    const [currentSong, setCurrentSong] = useState([])
    const [isPlaying, setIsplaying] = useState(false)
    const [isLoopOne, setIsLoopOne] = useState(false)
    const [isLoopAll, setIsLoopAll] = useState(false)
    const [songEnd, setSongEnd] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [songDuration, setSongDuration] = useState(0)
    const [songDurationPerc, setSongDurationPerc] = useState(0)


// UseEffect
    useEffect(() => {
        if(songs){
            setCurrentSong(songs[0]) 
        }
    }, [songs])

// Utils

const secToMinFunc = (param) => {
    return  Math.floor(param / 60) + ":" + 
    ("0" + Math.floor(param % 60)).slice(-2)
}

// Handlers

    const playSongHandler = () =>{
        if(!isPlaying){
            setIsplaying(true)
            audioRef.current.play()
        }else{
            setIsplaying(false)
            audioRef.current.pause()
        }      
    }

    const loopOneSongHandler = () =>{
        if(isLoopOne){
            setIsLoopOne(false)
        }else{
            if(isLoopAll){
                setIsLoopAll(false)
            }
            setIsLoopOne(true)
        }  
     
    }
    const loopAllSongsHandler = () =>{
        if(isLoopAll){
            setIsLoopAll(false)
        }else{
            if(isLoopOne){
                setIsLoopOne(false)
            }
            setIsLoopAll(true)
        }  
     
    }

    const songEndTimeHandler = async()=>{
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        await setSongEnd(true)
        if(isLoopOne){
            audioRef.current.play()
        }
        if(isLoopAll){
            currentIndex = currentIndex + 1
            await setCurrentSong(songs[currentIndex % songs.length])
            audioRef.current.play()
        }
    }

   const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime
    const duration = e.target.duration

    //  Calculate Percentage
    const currentRounded = Math.round(current)
    const durationRounded = Math.round(duration)
    const percentage = Math.round((currentRounded / durationRounded) * 100)

    setCurrentTime(current)
    setSongDuration(duration)
    setSongDurationPerc(percentage)

    rangeRef.current.value = (currentTime)
}

    const dragHandler =(e)=>{
        audioRef.current.currentTime = e.target.value
        console.log(e.target.value)
        setCurrentTime(e.target.value)
    }

    const changeVolumeHandler = (e) =>{
        const value = e.target.value;
        audioRef.current.volume = value;
    }

    const prevNextSongHandler = async(el) =>{
       
        // Find current Song Index
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)

        //   FORWARD
        if(el === "forward"){
            currentIndex = currentIndex + 1
            await setCurrentSong(songs[currentIndex % songs.length])            
        }
        //   REWIND
        if(el === "rewind"){
            currentIndex = currentIndex - 1
            if((currentIndex) % songs.length === -1){
                await setCurrentSong(songs[songs.length - 1]);
                if (isPlaying) audioRef.current.play();
                return
            } 
                await setCurrentSong(songs[currentIndex % songs.length]); 
        }
        if (isPlaying) audioRef.current.play();
    }

    return (
        <div>
             <div className="progressbar-container">
                <input 
                ref={rangeRef}
                type="range" 
                min={0}
                max={songDuration || 0}
                onChange={dragHandler}
                name="" id=""/>
                <p>start: {secToMinFunc(currentTime)}</p>
                <p>end:{secToMinFunc(songDuration)}</p>
                <label htmlFor="volume">Volume</label>
                <input
                    onChange={changeVolumeHandler}
                    max="1"
                    min="0"
                    step="0.01"
                    type="range"
                    id="volume"
                />
             </div>
            
            <div className="loop-container">
                <button onClick={loopOneSongHandler}type="submit">LOOP ONE</button>
                <button onClick={loopAllSongsHandler}type="submit">LOOP ALL</button>
            </div>

            <div className="skip-play-container">
            <button onClick={(e) => prevNextSongHandler("rewind")} type="submit">prev</button>

            <button onClick={playSongHandler}type="submit">play</button>

            <button onClick={(e) => prevNextSongHandler("forward")}type="submit">next</button>
            </div>

            {songs === undefined  && currentSong === [] && <h2>loading</h2>}
            <div className="song-details-container">
                <img src={currentSong.cover} alt={currentSong.name}/>
                <p>{currentSong.name}</p>
                {currentSong.active ? <p>Active</p> : <p>Inactive</p>}
                <p>Artist: {currentSong.artist}</p>
                <p>ID: {currentSong.id}</p>
            </div>
            <audio 
            ref={audioRef} 
            src={currentSong.audio}
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler}
            onEnded={songEndTimeHandler} 
            />
        </div>
    )
}

export default Song

