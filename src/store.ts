import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Dispatch, Middleware, MiddlewareAPI, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import counter from "./core/reducers/CouterReducer";
import playlists, { } from "./core/reducers/PlaylistsReducer";
import search from "./core/reducers/SearchReducer";
import tracks from "./core/reducers/TracksReducer";

import logger from 'redux-logger';
import thunk from 'redux-thunk';

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
    search,
    tracks
})

export type AppState = ReturnType<typeof reducer>


const middleware: Middleware[] = [
    // asyncThunkMiddleware,
    // logMiddleware,
    thunk,
    logger
    
];


export const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(...middleware)
    ));
    
    // const logMiddleware: Middleware = (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    //     action = next(action)
    //     console.log('[Action]', action?.type, action)
    //     console.log('[State]', api.getState())
    // }
    
    // // dispatch --action--> middleware --action--> reducer
    
    // const asyncThunkMiddleware: Middleware = (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    //     if (typeof action === 'function') {
    //         action(api.dispatch)
    //     } else {
    //         next(action)
    //     }
    // }
