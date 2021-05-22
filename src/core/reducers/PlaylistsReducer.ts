import { Dispatch, Reducer } from "redux"
import { ThunkDispatch } from "redux-thunk";
import { Playlist } from "../../model/Playlist";
import { SimpleTrack } from "../../model/Search";
import { AppState } from "../../store";
import { PLAYLISTS_LOAD, PLAYLISTS_SELECT, TRACKS_ADD_TO_PLAYLIST } from "./actions";

export interface PlaylistsState {
    items: Playlist[]
    selectedId?: Playlist['id'],
    message?: string
}

export type PLAYLISTS_REFRESH = {
    type: 'PLAYLISTS_REFRESH'
};
type PLAYLISTS_UPDATE = {
    type: 'PLAYLISTS_UPDATE'; payload: { playlist: Playlist; };
};

export type PLAYLISTS_SAVE = {
    type: 'PLAYLISTS_SAVE'; payload: { draft: Playlist; };
};

type PLAYLISTS_ADD = {
    type: 'PLAYLISTS_ADD'; payload: { draft: Playlist; };
};

type PLAYLISTS_REMOVE_TRACK = {
    type: 'PLAYLISTS_REMOVE_TRACK'; payload: { id: SimpleTrack['id']; };
};

type PLAYLISTS_REMOVE = {
    type: 'PLAYLISTS_REMOVE'; payload: { id?: Playlist['id']; };
};
type PLAYLISTS_ERROR = {
    type: 'PLAYLISTS_ERROR'; payload: { error?: Error; };
};


type Actions =
    | PLAYLISTS_ERROR
    | PLAYLISTS_LOAD
    | PLAYLISTS_SELECT
    | PLAYLISTS_UPDATE
    | PLAYLISTS_ADD
    | PLAYLISTS_REMOVE
    | TRACKS_ADD_TO_PLAYLIST
    | PLAYLISTS_REMOVE_TRACK
    | PLAYLISTS_REFRESH

const initialState: PlaylistsState = {
    items: [],
    selectedId: undefined,
    message: ''
}

const reducer: Reducer<PlaylistsState, Actions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'PLAYLISTS_LOAD': return {
            ...state, items: action.payload.items
        }
        case 'PLAYLISTS_ERROR': return {
            ...state, message: action.payload.error?.message
        }
        case 'PLAYLISTS_SELECT': return {
            ...state, selectedId: action.payload.id
        }
        case 'PLAYLISTS_ADD': return {
            ...state, items: [...state.items, action.payload.draft]
        }
        case 'PLAYLISTS_REMOVE': return {
            ...state, items: state.items.filter(p => p.id !== action.payload.id)
        }
        case 'PLAYLISTS_UPDATE': {
            const draft = action.payload.playlist
            return {
                ...state, items: state.items.map(p => p.id === draft.id ? draft : p)
            }
        }
        case 'PLAYLISTS_REMOVE_TRACK': return {
            ...state,
            items: state.items.map(playlist => {
                if (playlist.id !== state.selectedId) { return playlist }
                return {
                    ...playlist,
                    tracks: playlist.tracks?.filter(t => t.id !== action.payload.id)
                }
            })
        }
        case 'TRACKS_ADD_TO_PLAYLIST': return {
            ...state,
            items: state.items.map(playlist => {
                const draft = action.payload.draft;

                if (playlist.id !== action.payload.playlist_id) return playlist;

                return {
                    ...playlist,
                    // tracks: playlist.tracks?.map(t => t.id === draft.id ? draft : t) || []
                    tracks: [...(playlist.tracks || []), action.payload.draft]
                }

            })
        }
        default: return state
    }
}
export default reducer


export const playlistSave = (dispatch: ThunkDispatch<AppState, any, any>) => {
    // loading = true
    // saveToServer.then ...
    //// // fetchById.then
    // fetchAllPlaylists.then
    // dispatch(fetchPlalyistAction(id))
    // selectPlaylist.then
}

// export fetchPlalyistAction = (dispatch...

export const playlistsRefresh = (): PLAYLISTS_REFRESH => ({
    type: 'PLAYLISTS_REFRESH'
})
export const playlistsError = (error: any): PLAYLISTS_ERROR => ({
    type: 'PLAYLISTS_ERROR', payload: { error }
})
export const playlistsLoad = (items: Playlist[]): PLAYLISTS_LOAD => {

    return ({
        type: 'PLAYLISTS_LOAD', payload: { items }
    })
}
export const playlistsSelect = (id: Playlist['id']): PLAYLISTS_SELECT => ({
    type: 'PLAYLISTS_SELECT', payload: { id }
})
export const playlistsTrackRemove = (id: Playlist['id']): PLAYLISTS_REMOVE_TRACK => ({
    type: 'PLAYLISTS_REMOVE_TRACK', payload: { id }
})
export const playlistsRemove = (id: Playlist['id']): PLAYLISTS_REMOVE => ({
    type: 'PLAYLISTS_REMOVE', payload: { id }
})
export const playlistsSave = (playlist: Playlist): PLAYLISTS_SAVE => ({
    type: 'PLAYLISTS_SAVE', payload: { draft: playlist }
})
export const playlistsUpdate = (playlist: Playlist): PLAYLISTS_UPDATE => ({
    type: 'PLAYLISTS_UPDATE', payload: { playlist }
})
export const playlistsAdd = (draft: Playlist): PLAYLISTS_ADD => {
    draft.id = (~~(Math.random() * Date.now())).toString()

    return ({
        type: 'PLAYLISTS_ADD', payload: { draft }
    })
}

/* Selectors */

export const selectSelectedPlaylist = (state: AppState) => {
    return state.playlists.items.find(p => state.playlists.selectedId === p.id)
}

export const selectPlaylists = (state: AppState) => {
    return state.playlists.items
}