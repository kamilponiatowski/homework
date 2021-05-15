import { AlbumView } from "../../model/Search";

interface SearchState { query: string, isLoading: boolean, message: string, results: AlbumView[] }
type Actions =
    | SEARCH_START
    | SEARCH_SUCCESS
    | SEARCH_FAILED;

type SEARCH_START = { type: 'SEARCH_START', payload: { query: string } }
type SEARCH_SUCCESS = { type: 'SEARCH_SUCCESS', payload: { results: AlbumView[] } }
type SEARCH_FAILED = { type: 'SEARCH_FAILED', payload: { error: Error } }

export const searchStart = (query: string): SEARCH_START => ({ type: 'SEARCH_START', payload: { query } })
export const searchSuccess = (results: AlbumView[]): SEARCH_SUCCESS => ({ type: 'SEARCH_SUCCESS', payload: { results } })
export const searchFailed = (error: Error): SEARCH_FAILED => ({ type: 'SEARCH_FAILED', payload: { error } })

export const initialState = { query: '', isLoading: false, message: '', results: [] as AlbumView[] }


const reducer = (state: SearchState, action: Actions): SearchState => {

    switch (action.type) {
        case 'SEARCH_START': return {
            ...state, isLoading: true, query: action.payload.query, message: ''
        }
        case 'SEARCH_SUCCESS': return {
            ...state, isLoading: false, results: action.payload.results
        }
        case 'SEARCH_FAILED': return {
            ...state, isLoading: false, message: action.payload.error?.message || 'Unexpected Error'
        }
        default:
            return state
    }

}

export default reducer as () => SearchState