import { AlbumView } from "../../model/Search";
import { AppState } from "../../store";

interface SearchState {
    query: string,
    isLoading: boolean,
    message: string,
    results: AlbumView['id'][]
    entities: { [k: string]: AlbumView }
}
type Actions =
    | SEARCH_START
    | SEARCH_SUCCESS
    | SEARCH_FAILED;

type SEARCH_START = { type: 'SEARCH_START', payload: { query: string } }
type SEARCH_SUCCESS = { type: 'SEARCH_SUCCESS', payload: { results: AlbumView[] } }
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
        default:
            return state
    }

}

export default reducer as () => SearchState

/* 
    PUBLIC ACCESS :
*/

/* Action Creators */
export const searchStart = (query: string): SEARCH_START => ({ type: 'SEARCH_START', payload: { query } })
export const searchSuccess = (results: AlbumView[]): SEARCH_SUCCESS => ({ type: 'SEARCH_SUCCESS', payload: { results } })
export const searchFailed = (error: Error): SEARCH_FAILED => ({ type: 'SEARCH_FAILED', payload: { error } })

/* Store Selector */
export const selectSearchState = (state: AppState) => state.search

export const selectSearchQuery = (state: AppState): string => selectSearchState(state).query

export const selectSearchResults = (state: AppState): AlbumView[] => {
    const search = selectSearchState(state)
    return search.results.map(id => search.entities[id])
}