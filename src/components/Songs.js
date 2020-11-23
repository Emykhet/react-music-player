// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import Song from "./Song"
// import {fetchSong } from "../actions/songActions"

// const Songs = () => {
//     const dispatch = useDispatch()

//     const songList = useSelector(state => state.songList)
//     const {songs, loading, error} = songList
//     console.log(songs)



//     useEffect(()=>{
//         if(songs === undefined){
//                 return
//         }
//       dispatch(fetchSong())
//     }, [dispatch])

//     return (
//         <div>
        //   {songs === undefined ? <h1>loading</h1> : (
        //       <Song songs={songs} />
        //     //   songs.map((song) =>(
        //     //     <Song 
        //     //     name={song.name}
        //     //     key={song.id}
        //     //     id={song.id}
        //     //     cover={song.cover}
        //     //     active={song.active}
        //     //     audio={song.audio}
        //     //     color={song.color}
        //     //     artist={song.artist}
        //     //     />
        //     //   ))
//           )}
//         </div>
//     )
// }

// export default Songs
