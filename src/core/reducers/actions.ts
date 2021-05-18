import { Playlist } from "../../model/Playlist";
import { SimpleTrack } from "../../model/Search";

const actions = {};
export type PLAYLISTS_LOAD = {
    type: 'PLAYLISTS_LOAD'; payload: { items: Playlist[]; };
};

export type PLAYLISTS_SELECT = {
    type: 'PLAYLISTS_SELECT'; payload: { id?: Playlist['id']; };
};

export type TRACKS_ADD_TO_PLAYLIST = {
    type: 'TRACKS_ADD_TO_PLAYLIST'; payload: {
        draft: SimpleTrack;
        playlist_id: Playlist['id'],
    };
};



export const trackAddToPlaylist = (draft: SimpleTrack, playlist_id: Playlist['id']): TRACKS_ADD_TO_PLAYLIST => ({
    type: 'TRACKS_ADD_TO_PLAYLIST', payload: { draft, playlist_id }
})
