import {
    FETCH_SONGS_REQUEST, 
    FETCH_SONGS_SUCCESS,
    FETCH_SONGS_FAIL,
} from '../actions/actionTypes'


  export const fetchSongReducer = (state = {}, action) =>{
            switch(action.type){
                case FETCH_SONGS_SUCCESS:
                    return {...state, loading: false, songs: action.payload}
                default:
                    return state
            }
    }

