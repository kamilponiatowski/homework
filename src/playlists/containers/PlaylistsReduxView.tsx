// tsrafc
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Playlist } from '../../model/Playlist'
import { SearchForm } from '../../core/components/SearchForm'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistEditForm } from '../components/PlaylistEditForm'
import { PlaylistList } from '../components/PlaylistList'
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { AppState } from '../../store'
import { playlistsAdd, playlistsRefresh, playlistsRemove, playlistsSave, playlistsSelect, playlistsUpdate } from '../../core/reducers/PlaylistsReducer'

interface Props { }

const data: Playlist[] = []


export const PlaylistsReduxView = (props: Props) => {
    const [filter, setFilter] = useState('')

    const dispatch = useDispatch()
    const playlists = useSelector((state: AppState) =>
        state.playlists.items)

    const selectedPlaylist = useSelector((state: AppState) =>
        state.playlists.items.find(p => p.id === state.playlists.selectedId))

    // Router
    const { replace, push } = useHistory()
    const { playlist_id } = useParams<{ playlist_id: string }>()

    useEffect(() => { dispatch(playlistsSelect(playlist_id)) }, [playlist_id])
    useEffect(() => { dispatch(playlistsRefresh()) }, [])

    const changeSelectedPlaylist = useCallback((id: Playlist['id']) => { push('/playlists/' + id + '/') }, [])

    const edit = useCallback(() => { replace(`/playlists/${playlist_id}/edit`) }, [playlist_id])

    const cancel = useCallback(() => { replace(`/playlists/${playlist_id}/`) }, [playlist_id])


    // Updating playlists   
    const saveChangedPlaylist = useCallback((draft: Playlist) => {
        if (draft.name.length < 3) { return [new Error('Too short!')] }
        dispatch(playlistsSave(draft))
        replace('/playlists/' + draft.id + '/')
        return null
    }, [])


    const saveNewPlaylist = useCallback((draft: Playlist) => {
        if (draft.name.length < 3) {
            return [new Error('Too short!')]
        }
        dispatch(playlistsAdd(draft))
        replace('/playlists/' + draft.id + '/')
        return null;
    }, [])

    const removePlaylist = useCallback((id: Playlist['id']) => {
        dispatch(playlistsRemove(id))
    }, [])

    const emptyPlaylist = useMemo<Playlist>(() => ({
        id: '',
        name: '',
        public: false,
        description: ''
    }), [])


    return/*  useMemo(() => */ (
        <div>
            <h4>PlaylistsView</h4>
            {/* .row>.col*2 */}
            <div className="row">
                <div className="col">
                    <SearchForm onSearch={setFilter} />
                    <hr />
                    <PlaylistList
                        onSelected={changeSelectedPlaylist}
                        onRemove={removePlaylist}
                        playlists={playlists}
                        selectedId={selectedPlaylist?.id} />

                    <button className="btn btn-info btn-block mt-4" onClick={() => push('/playlists/create')}>Create New Playlist</button>
                </div>
                <div className="col">

                    <Switch>
                        {<Route path="/playlists/" exact={true} render={() => <div className="alert alert-info">Please select playlist</div>} />}

                        {<Route path="/playlists/create" render={() => <PlaylistEditForm
                            save={saveNewPlaylist}
                            playlist={emptyPlaylist}
                            cancel={cancel}
                        />} />}

                        {selectedPlaylist && <Route path="/playlists/:playlist_id/" exact={true} render={() => <PlaylistDetails
                            onEdit={edit}
                            playlist={selectedPlaylist} />} />}

                        {selectedPlaylist && <Route path="/playlists/:playlist_id/edit" render={() => <PlaylistEditForm
                            playlist={selectedPlaylist}
                            save={saveChangedPlaylist}
                            cancel={cancel}
                        />} />}

                    </Switch>
                </div>
            </div>
        </div>
    )
    // , [
    //     playlists, selectedPlaylist, mode, emptyPlaylist, 
    //     changeSelectedPlaylist, removePlaylist, saveChangedPlaylist, saveNewPlaylist
    // ])
}
