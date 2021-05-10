// tsrafc
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Playlist } from '../../model/Playlist'
import { SearchForm } from '../../core/components/SearchForm'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistEditForm } from '../components/PlaylistEditForm'
import { PlaylistList } from '../components/PlaylistList'
import { Route, Switch, useHistory, useParams } from 'react-router'

interface Props { }

const data: Playlist[] = [
    {
        id: '123',
        name: 'Playlista 😇',
        public: true,
        description: 'no i co ja dzis polubie?..🤔'
    },
    {
        id: '234',
        name: 'Playlista 😁',
        public: false,
        description: 'moze polubię TypeScript?. 🚀'
    },
    {
        id: '345',
        name: 'Playlista 😆',
        public: true,
        description: 'albo wszystko polubię co mi tam 😅💖'
    },
]


export const PlaylistsView = (props: Props) => {
    const [selectedId, setSelectedId] = useState<string | undefined>()
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | undefined>()
    const [playlists, setPlaylists] = useState<Playlist[]>(data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filter, setFilter] = useState('')

    const { replace, push } = useHistory()
    // /user/:user_id/posts/:post_id/comments/345/edit
    const { playlist_id } = useParams<{ playlist_id: string }>()

    useEffect(() => {
        setSelectedId(playlist_id || undefined)
    }, [playlist_id])

    const changeSelectedPlaylist = useCallback((id: Playlist['id']): void => {
        push('/playlists/' + id + '/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        setSelectedPlaylist(playlists.find(p => p.id === selectedId))
    }, [selectedId, playlists])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const edit = useCallback(() => { replace(`/playlists/${playlist_id}/edit`) }, [playlist_id])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cancel = useCallback(() => { replace(`/playlists/${playlist_id}/`) }, [playlist_id])

    const saveChangedPlaylist = useCallback((draft: Playlist) => {
        if (draft.name.length < 3) {
            return [new Error('Too short!')]
        }
        replace('/playlists/' + draft.id + '/')
        setPlaylists(playlists => playlists.map(p => p.id === draft.id ? draft : p))
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const saveNewPlaylist = useCallback((draft: Playlist) => {
        if (draft.name.length < 3) {
            return [new Error('Too short!')]
        }
        draft.id = (~~(Math.random() * Date.now())).toString()

        // setPlaylists([...playlists, draft])
        setPlaylists(playlists => [...playlists, draft])

        replace('/playlists/' + draft.id + '/')
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const removePlaylist = useCallback((id: Playlist['id']) => {
        setPlaylists(playlists.filter(p => p.id !== id))
    }, [playlists])

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
