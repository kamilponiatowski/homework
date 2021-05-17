import { combineReducers, createStore, Reducer } from "redux";
import counter from "./core/reducers/CouterReducer";
import playlists from "./core/reducers/PlaylistsReducer";
import search from "./core/reducers/SearchReducer";
import tracks from "./core/reducers/TracksReducer";

const reducer = combineReducers({
    counter,
    playlists,
    search: search,
    tracks: tracks
})

export type AppState = ReturnType<typeof reducer>

export const store = createStore(reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
    && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
