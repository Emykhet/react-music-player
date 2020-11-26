import React, {useContext, useReducer} from "react"
import StateContext from "./stateContext"
import stateReducer from "./stateReducer"

// Components
import Song from "./components/Song"
import Playlist from "./components/Playlist"
import PlaylistSong from "./components/PlaylistSong"
// Styles
import "./App.css"

function App() {
  const initialState = useContext(StateContext)
  const [state, dispatch] = useReducer(stateReducer, initialState)
  // console.log("State_App.js", state)
  return (
    <div className="App">
      <h2>App</h2>
      <StateContext.Provider value={{state, dispatch}}>
        <Song />
        <Playlist />
      </StateContext.Provider>
    </div>
  );
}

export default App;
