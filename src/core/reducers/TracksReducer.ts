import { Reducer } from "react";
import { Playlist } from "../../model/Playlist";
import { SimpleTrack, Track } from "../../model/Search";
import { AppState } from "../../store";
import { PLAYLISTS_LOAD, PLAYLISTS_SELECT, TRACKS_ADD_TO_PLAYLIST } from "./actions";

export interface TracksState {
    tracks: { [key: string]: SimpleTrack }
    selectedTrackId?: Track['id']
}

type TRACKS_LOAD = {
    type: 'TRACKS_LOAD'; payload: { items: SimpleTrack[]; };
};
type TRACKS_SELECT = {
    type: 'TRACKS_SELECT'; payload: { id: SimpleTrack['id']; };
};

/* Ask Kamil ;-) */
const TRACKS_UPDATE = 'TRACKS_UPDATE' as const;
export const tracksUpdate = (draft: SimpleTrack) => ({
    type: TRACKS_UPDATE, payload: { draft }
})
type TRACKS_UPDATE = ReturnType<typeof tracksUpdate>

type Actions =
    | PLAYLISTS_LOAD
    | TRACKS_LOAD
    | TRACKS_SELECT
    | TRACKS_UPDATE
    | TRACKS_ADD_TO_PLAYLIST

const initialState: TracksState = {
    // playlists: [],
    tracks: {
        // "123": {..track 123..}
    }
}

/* Reducer */
const reducer: Reducer<TracksState, Actions> = (
    state = initialState,
    action
): TracksState => {
    switch (action.type) {
        case 'PLAYLISTS_LOAD': return {
            ...state,
            tracks: action.payload.items.reduce((tracks, playlist) => {
                let items: SimpleTrack[] = []
                if (!(playlist.tracks instanceof Array)) {
                    tracks = (playlist.tracks as any).items || [];
                }else{
                    items = playlist.tracks
                }

                return reduceTracks(tracks, items || [])
            }, state.tracks)
        }
        case 'TRACKS_SELECT': return {
            ...state, selectedTrackId: action.payload.id
        }
        case 'TRACKS_UPDATE': return {
            ...state, tracks: { ...state.tracks, [action.payload.draft.id]: action.payload.draft }
        }
        case 'TRACKS_LOAD': return {
            ...state,
            tracks: reduceTracks(state.tracks, action.payload.items)
        }
        case 'TRACKS_ADD_TO_PLAYLIST': return {
            ...state,
            tracks: reduceTracks(state.tracks, [action.payload.draft])
        }
        default: return state
    }
}
export default reducer as () => TracksState

/* Action Creators */
export const tracksPlaylistsLoad = (items: Playlist[]): PLAYLISTS_LOAD => ({
    type: 'PLAYLISTS_LOAD', payload: { items }
})

export const tracksLoad = (items: SimpleTrack[]): TRACKS_LOAD => ({
    type: 'TRACKS_LOAD', payload: { items }
})

export const tracksPlaylistsSelect = (id: Playlist['id']): PLAYLISTS_SELECT => ({
    type: 'PLAYLISTS_SELECT', payload: { id }
})

export const tracksSelect = (track: SimpleTrack): TRACKS_SELECT => ({
    type: 'TRACKS_SELECT', payload: { id: track.id }
})

/* Selectors */
export const selectPlaylists = (state: AppState) => state.playlists.items

export const selectPlaylist = (state: AppState) => {
    return state.playlists.items.find(p => p.id == state.playlists.selectedId)
}

export const selectSelectedPlaylistTracks = (state: AppState) => {
    return selectPlaylist(state)?.tracks?.map(track => state.tracks.tracks[track.id]) || [] as SimpleTrack[]
}

export const selectTracks = (state: AppState) => selectPlaylist(state)?.tracks || []

export const selectSelectedTrack = (state: AppState) => {
    return state.tracks.selectedTrackId && state.tracks.tracks[state.tracks.selectedTrackId] || undefined
}


/* Reducer helpers  */
function reduceTracks(state: { [k: string]: SimpleTrack }, tracks: SimpleTrack[]) {
    return tracks.reduce((tracks, track) => {
        tracks[track.id] = track;
        return tracks;
    }, state)
}

/* Create Action Helper */
/* https://redux-toolkit.js.org/api/createReducer */

function createAction<T>(type: string) {
    const actionCreator = (payload: T) => ({
        type,
        payload
    })
    actionCreator.type = type;

    return actionCreator
}

const increment = createAction<number>('increment')
const action = increment(123)

// dispatch

switch (action.type) {
    case increment.type: {
        action.payload.toExponential()
    }
}

