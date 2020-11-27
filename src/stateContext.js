import React, {createContext} from 'react'
import songDatabase from "./songDatabase"

const StateContext = createContext({
    songs:songDatabase,
    activeSong: songDatabase[0]
})

export default StateContext
