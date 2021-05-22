import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { Album, AlbumView } from "../../model/Search";
import { AppState } from "../../store";
import { fetchAlbums } from "../hooks/useSearchAlbums";

interface SearchState {
    albumId?: Album['id']
    query: string,
    isLoading: boolean,
    message: string,
    results: AlbumView['id'][]
    entities: { [k: string]: Album }
}

type Actions =
    | SEARCH_START
    | SEARCH_SUCCESS
    | SEARCH_FAILED
    | FETCH_ALBUM_START
    | FETCH_ALBUM_SUCCESS
    | FETCH_ALBUM_FAILED

type FETCH_ALBUM_START = { type: 'FETCH_ALBUM_START', payload: { id: Album['id'] } }
type FETCH_ALBUM_SUCCESS = { type: 'FETCH_ALBUM_SUCCESS', payload: { result: Album } }
type FETCH_ALBUM_FAILED = { type: 'FETCH_ALBUM_FAILED', payload: { error: Error } }

export type SEARCH_START = { type: 'SEARCH_START', payload: { query: string } }
type SEARCH_SUCCESS = { type: 'SEARCH_SUCCESS', payload: { results: Album[] } }
type SEARCH_FAILED = { type: 'SEARCH_FAILED', payload: { error: Error } }

export const initialState: SearchState = {
    query: '',
    isLoading: false,
    message: '',
    results: [],
    entities: {
        /// "123":{...album...}
    }
}

const reducer = (
    state = initialState,
    action: Actions

): SearchState => {

    switch (action.type) {
        case 'SEARCH_START': return {
            ...state, isLoading: true, query: action.payload.query, message: ''
        }
        case 'SEARCH_SUCCESS': return {
            ...state, isLoading: false,
            results: action.payload.results.map(a => a.id),
            entities: action.payload.results.reduce((entities, album) => ({
                ...entities,
                [album.id]: album
            }), state.entities)
        }
        case 'SEARCH_FAILED': return {
            ...state, isLoading: false, message: action.payload.error?.message || 'Unexpected Error'
        }
        /* ====== One Album ===== */
        case 'FETCH_ALBUM_START': return {
            ...state, albumId: action.payload.id,
            //isLoading: true, message: ''
        }
        case 'FETCH_ALBUM_SUCCESS': return {
            ...state, entities: {
                ...state.entities,
                [action.payload.result.id]: action.payload.result

            }, isLoading: false
        }
        case 'FETCH_ALBUM_FAILED': return {
            ...state, message: action.payload.error?.message, isLoading: false
        }
        default:
            return state
    }

}

export default reducer as () => SearchState

/* 
    PUBLIC ACCESS :
*/

/* Action Creators */
// export const searchStart = (dispatch: Dispatch) => (query: string) => {
export const searchStartMakeThunk =
    // (query: string): ThunkAction<Promise<SEARCH_SUCCESS | SEARCH_FAILED>, AppState, void, any> => (dispatch):Promise<any> => {
    (query: string) => async (dispatch: Dispatch) => {

        try {
            dispatch(searchStart(query))
            const res = await fetchAlbums(query)
            dispatch(searchSuccess(res))
        } catch (error) {
            dispatch(searchFailed(error))
        }

    }
export const searchStart = (query: string): SEARCH_START => ({ type: 'SEARCH_START', payload: { query } })
export const searchSuccess = (results: Album[]): SEARCH_SUCCESS => ({ type: 'SEARCH_SUCCESS', payload: { results } })
export const searchFailed = (error: Error): SEARCH_FAILED => ({ type: 'SEARCH_FAILED', payload: { error } })


export const fetchAlbumStart = (id: string): FETCH_ALBUM_START => ({
    type: 'FETCH_ALBUM_START', payload: { id }
})
export const fetchAlbumSuccess = (result: Album): FETCH_ALBUM_SUCCESS => ({
    type: 'FETCH_ALBUM_SUCCESS', payload: { result }
})
export const fetchAlbumFailed = (error: Error): FETCH_ALBUM_FAILED => ({
    type: 'FETCH_ALBUM_FAILED', payload: { error }
})

/* Store Selector */
export const selectSearchState = (state: AppState) => state.search

export const selectSearchQuery = (state: AppState): string => selectSearchState(state).query

export const selectSearchResults = (state: AppState): AlbumView[] => {
    const search = selectSearchState(state)
    return search.results.map(id => search.entities[id])
}


export const selectAlbumFetchState = (state: AppState) => state.search
export const selectAlbum = (state: AppState) => {
    return state.search.albumId ? state.search.entities[state.search.albumId] : undefined
}



// [{type:'Action1'},{type:'Action2'},{type:'Action3'},]

// const multistep = param => (dispatch) => {

//     dispatch({type:'Action1'}))

//     return (dispatch) => {
//         dispatch({type:'Action2'}))

//         return (dispatch) => {
//             dispatch({type:'Action3'}))

//         }
//     }
// }