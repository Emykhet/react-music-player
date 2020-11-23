import songDatabase from "../songDatabase"
import {
    FETCH_SONGS_REQUEST, 
    FETCH_SONGS_SUCCESS,
    FETCH_SONGS_FAIL
} from './actionTypes'


export const fetchSong = () => (dispatch) =>{
    const data = songDatabase()
  
    dispatch({
        type:  FETCH_SONGS_SUCCESS,
        payload: data,
    })
}
