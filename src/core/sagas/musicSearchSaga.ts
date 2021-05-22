import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { Album } from '../../model/Search';
import { fetchAlbums } from '../hooks/useSearchAlbums';
import { searchFailed, searchSuccess, SEARCH_START } from '../reducers/SearchReducer';


function* fetchSearchResults(action: SEARCH_START) {
    try {
        const results: Album[] = yield call(fetchAlbums, action.payload.query);
        yield put(searchSuccess(results))
    } catch (error) {
        yield put(searchFailed(error))
    }
}

export function* musicSearchSaga() {
    yield takeLatest("SEARCH_START", fetchSearchResults);
}