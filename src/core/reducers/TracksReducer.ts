import { Reducer } from "react";
import { Playlist } from "../../model/Playlist";
import { SimpleTrack, Track } from "../../model/Search";
import { AppState } from "../../store";
import Swal from 'sweetalert2'
export interface TracksState {
    playlists: {
        items: Playlist[]
    }
    tracks: {
        [key: string]: SimpleTrack
    }
    selectedPlaylistId?: Playlist['id']
    selectedTrackId?: Track['id']
}

/* Action types */
type PLAYLISTS_LOAD = {
    type: 'PLAYLISTS_LOAD'; payload: { items: Playlist[]; };
};
type TRACKS_LOAD = {
    type: 'TRACKS_LOAD'; payload: { items: SimpleTrack[]; };
};
type PLAYLISTS_SELECT = {
    type: 'PLAYLISTS_SELECT'; payload: { id: Playlist['id']; };
};
type TRACKS_SELECT = {
    type: 'TRACKS_SELECT'; payload: { id: SimpleTrack['id']; };
};
type TRACKS_UPDATE = {
    type: 'TRACKS_UPDATE'; payload: { draft: SimpleTrack; };
};
type TRACK_ADD_TO_SELECTED_PLAYLIST = {
    type: 'TRACK_ADD_TO_SELECTED_PLAYLIST'; payload: { track: Track };
};

type Actions =
    | PLAYLISTS_LOAD
    | TRACKS_LOAD
    | PLAYLISTS_SELECT
    | TRACKS_SELECT
    | TRACKS_UPDATE
    | TRACK_ADD_TO_SELECTED_PLAYLIST

const initialState: TracksState = {
    playlists: { items: [] },
    tracks: {},
}

/* Reducer */
const reducer: Reducer<TracksState, Actions> = (
    state = initialState,
    action
): TracksState => {
    switch (action.type) {
        case 'PLAYLISTS_LOAD': return {
            ...state,
            playlists: { items: action.payload.items },
            tracks: action.payload.items.reduce((tracks, playlist) => {
                return reduceTracks(tracks, playlist.tracks || [])
            }, state.tracks)
        }
        case 'PLAYLISTS_SELECT': return {
            ...state, selectedPlaylistId: action.payload.id, selectedTrackId: undefined
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
        case 'TRACK_ADD_TO_SELECTED_PLAYLIST': {
            if (!state.selectedPlaylistId) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'First select the playlist to which you want to add a song. Yrsssss.',
                })
                return state
            }
            return {
                ...state,
                playlists: {
                    items: state.playlists.items.map(p => {
                        if (p.id !== state.selectedPlaylistId) return p
                        if (p.tracks?.find(t => t.id === action.payload.track.id)) return p
                        return {
                            ...p,
                            tracks: [...p.tracks!, action.payload.track]
                        }
                    })
                }
            }
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

export const tracksSelect = (id: SimpleTrack['id']): TRACKS_SELECT => ({
    type: 'TRACKS_SELECT', payload: { id }
})

export const tracksUpdate = (draft: SimpleTrack): TRACKS_UPDATE => ({
    type: 'TRACKS_UPDATE', payload: { draft }
})

export const trackAddToSelectedPlaylist = (track: Track): TRACK_ADD_TO_SELECTED_PLAYLIST => ({
    type: 'TRACK_ADD_TO_SELECTED_PLAYLIST', payload: { track }
})

/* Selectors */
export const selectPlaylists = (state: AppState) => state.tracks.playlists

export const selectPlaylist = (state: AppState) => {
    return state.tracks.playlists.items.find(p => p.id === state.tracks.selectedPlaylistId)
}

export const selectSelectedPlaylistTracks = (state: AppState) => {
    return selectPlaylist(state)?.tracks?.map(track => state.tracks.tracks[track.id]) || [] as SimpleTrack[]
}

export const selectTracks = (state: AppState) => selectPlaylist(state)?.tracks || []

export const selectSelectedTrack = (state: AppState) => {
    return (state.tracks.selectedTrackId && state.tracks.tracks[state.tracks.selectedTrackId]) || undefined
}


/* Reducer helpers  */
function reduceTracks(state: { [k: string]: SimpleTrack }, tracks: SimpleTrack[]) {
    return tracks.reduce((tracks, track) => {
        tracks[track.id] = track;
        return tracks;
    }, state)
}