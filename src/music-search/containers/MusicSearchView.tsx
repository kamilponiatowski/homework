import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router'
import { ThunkDispatch } from 'redux-thunk';
import { SearchForm } from '../../core/components/SearchForm';
import { fetchAlbums } from '../../core/hooks/useSearchAlbums';
import { searchFailed, searchStart, searchSuccess, selectSearchQuery, selectSearchResults, selectSearchState } from '../../core/reducers/SearchReducer';
import { AppState } from '../../store';
import { AlbumGrid } from '../components/AlbumGrid';

interface Props { }

export const MusicSearchView = (props: Props) => {
    const ref = useRef<{ reset(): void } | null>(null)
    const { push, replace } = useHistory()
    const { search: searchParams } = useLocation()

    const dispatch = useDispatch()
    const { isLoading, message } = useSelector(selectSearchState)
    const query = useSelector(selectSearchQuery)
    const results = useSelector(selectSearchResults)

    // const searchStartDispatch = useCallback(searchStart(dispatch), [])

    useEffect(() => {
        const q = new URLSearchParams(searchParams.slice(1)).get('q')
        if (!q) { return; }
        window.document.title = 'Searching ' + q;
        
        (dispatch(searchStart(q)) as any).then(() => {
            console.log('Thunk finished')
        })

    }, [searchParams])

    const search = useCallback((query) => {
        replace('/search?q=' + query)
    }, [])

    return (
        <div>
            <div className="row">
                <div className="col">
                    <SearchForm onSearch={search} query={query} ref={ref} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoading && <p className="alert alert-info">Loading</p>}
                    {message && <p className="alert alert-danger">{message}</p>}

                    {results && <div data-testid="search-results">
                        <AlbumGrid albums={results} />
                    </div>}
                </div>
            </div>
        </div>
    )
}
