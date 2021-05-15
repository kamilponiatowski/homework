import { Reducer } from "react";
import { Playlist } from "../../model/Playlist";

export interface PlaylistsState {
    // ???
}

type PLAYLISTS_LOAD = {
    type: 'PLAYLISTS_LOAD'; payload: { items: Playlist[]; };
};
// ???

type Actions =
    | PLAYLISTS_LOAD
// ???

const initialState: PlaylistsState = {
    // ???
}

const reducer: Reducer<PlaylistsState, Actions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'PLAYLISTS_LOAD': return {
            ...state
        }
        // ???
        default: return state
    }
}
export default reducer

export const playlistsLoad = (items: Playlist[]): PLAYLISTS_LOAD => ({
    type: 'PLAYLISTS_LOAD', payload: { items }
})
// ???