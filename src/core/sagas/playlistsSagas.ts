import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { Playlist } from '../../model/Playlist';
import { Album } from '../../model/Search';
import { fetchPlaylists, updatePlaylistDetails } from '../hooks/usePlaylists';
import { fetchAlbums } from '../hooks/useSearchAlbums';
import { playlistsError, playlistsLoad, playlistsRefresh, playlistsSelect, playlistsUpdate, PLAYLISTS_REFRESH, PLAYLISTS_SAVE } from '../reducers/PlaylistsReducer';
import { searchFailed, searchSuccess, SEARCH_START } from '../reducers/SearchReducer';


function* refreshPlaylists(action: PLAYLISTS_REFRESH) {
    try {
        const results: Playlist[] = yield call(fetchPlaylists);
        debugger
        yield put(playlistsLoad(results))
    } catch (error) {debugger
        yield put(playlistsError(error))
    }
}


function* savePlaylist(action: PLAYLISTS_SAVE) {
    debugger
    try {
        const result: Playlist = yield call(updatePlaylistDetails, action.payload.draft);
        yield put(playlistsUpdate(result))
        yield put(playlistsRefresh())
        yield put(playlistsSelect(result.id))

    } catch (error) {debugger
        yield put(playlistsError(error))
    }
}

export function* playlistsSaga() {
    yield takeLatest("PLAYLISTS_REFRESH", refreshPlaylists);
    yield takeLatest("PLAYLISTS_SAVE", savePlaylist);
}