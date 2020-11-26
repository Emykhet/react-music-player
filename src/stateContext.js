import React, {createContext} from 'react'
import songDatabase from "./songDatabase"

const StateContext = createContext({
    songs:songDatabase,
    songInfo: {
        currentTime: 0,
        duration: 0,
        duraratonPercentage: 0,
        volume: 0,
        end: false,
    },
    activeSong: songDatabase[0]
})

export default StateContext
