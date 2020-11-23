import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css"

import Song from "./components/Song"
import Songs from "./components/Songs"
import Playlist from "./components/Playlist"
import PlaylistSong from "./components/PlaylistSong"

function App() {

  return (
    <div className="App">
      <h2>App</h2>
      <Song />
      <Playlist />
      <PlaylistSong />
    </div>
  );
}

export default App;
