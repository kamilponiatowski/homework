import { Reducer } from "react";
import { Playlist } from "../../model/Playlist";
import { SimpleTrack, Track } from "../../model/Search";
import { AppState } from "../../store";

export interface TracksState {
    playlists: {
        items: Playlist[]
    }

    tracks: {
        [key: string]: SimpleTrack
    }
    // tracks: {
    //     playlists: Playlist[]
    //     tracks: SimpleTrack,
    //     selectedPlaylistId: string
    // }

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
    tracks: {
        // "123": {..track 123..}
    }
}
// items: [...state.playlists.items, action.payload.track]
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
            if (!state.selectedPlaylistId) return state
            // const newPlaylists = state.playlists.items
            //     .find(p => p.id === state.selectedPlaylistId)
            const newPlaylists = state.playlists.items.map(p => {
                if (p.id !== state.selectedPlaylistId) return p
                return {
                    ...p,
                    tracks: [...p.tracks!, action.payload.track]
                }
            })
            // const aaaa = state.playlists.items.reduce((arr, p) => {
            //     if (p.id !== state.selectedPlaylistId) return [...arr, p]
            // }, [])
            console.log(action)
            console.log(newPlaylists);
            // console.log(newPlaylists2);
            return {
                ...state,
                playlists: {
                    // ...state.playlists,
                    items: newPlaylists
                }
                // playlists: {
                //     ...state.playlists,
                //     items: [
                //         ...state.playlists.items,

                //         // ...state.playlists.items,
                //         // action.payload.track
                //     ]
                // }
                // tracks: {
                //     ...state.tracks,
                //     playlists: {
                //         ...state.playlists.items
                //     }
                // }
            }
        }
        // case 'TRACK_ADD_TO_SELECTED_PLAYLIST': return {
        //     ...state,
        //     // tracks: state.playlists.find(p => p.id === state.tracks.selectedPlaylistId)
        // }
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
    return state.tracks.playlists.items.find(p => p.id == state.tracks.selectedPlaylistId)
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