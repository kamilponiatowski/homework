import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Dispatch, Middleware, MiddlewareAPI, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
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
    search,
    tracks
})

export type AppState = ReturnType<typeof reducer>

const logMiddleware: Middleware = (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    // api.getState()
    // if(action.type !=='SEARCH_START')
    action = next(action)
    console.log('[Action]', action?.type, action)
    console.log('[State]', api.getState())
}

const asyncThunkMiddleware: Middleware = (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (typeof action === 'function') {
        action(api.dispatch)
    } else {
        next(action)
    }
}

// // Chain of responsibility pattern
// store.dispatch = midA.dispatch 
// midA.next = midB
// midB.next = midC 
// midC.next = reducer


const middleware: Middleware[] = [
    asyncThunkMiddleware,
    logMiddleware,
];

// const composeEnhancers = ((window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()) || compose
// export const store = createStore(reducer, composeEnhancers(

export const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(...middleware)
));
