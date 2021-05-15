import { combineReducers, createStore, Reducer } from "redux";
import counter from "./core/reducers/CouterReducer";
import playlists, { } from "./core/reducers/PlaylistsReducer";
import search from "./core/reducers/SearchReducer";
import tracks from "./core/reducers/TracksReducer";


// const initialState = {
//     counter: 0,
//     playlists:
// }

// const reducer: Reducer<typeof initialState, any> = (state = initialState, action) => {
//     switch (action.type) {
//         default: return {
//             ...state,
//             counter: counter(state.counter, action),
//             playlists: playlists(state.playlists, action),
//         }
//     }
// }

const reducer = combineReducers({
    // counter: counter,  // Slice Reducer
    counter,
    playlists,
    search: search,
    tracks: tracks
})

export type AppState = ReturnType<typeof reducer>


export const store = createStore(reducer);
