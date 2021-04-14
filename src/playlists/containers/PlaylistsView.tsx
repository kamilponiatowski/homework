// tsrafc
import React, { useEffect, useState } from 'react'
import { Playlist } from '../../model/Playlist'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistEditForm } from '../components/PlaylistEditForm'
import { PlaylistList } from '../components/PlaylistList'
import { PlaylistCreateNewPlaylist } from '../components/PlaylistCreateNewPlaylist'

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
    const [mode, setMode] = useState<'details' | 'form' | 'new' | 'default'>('default')
    const [playlists, setPlaylists] = useState<Playlist[]>(data)
    const [showInfoToSelectPlaylist, setShowInfoToSelectPlaylist] = useState<Boolean>(true)

    /* TODO:

        - git checkout -b mojezadanie1
        - git add .
        - git commit -m "Moje zadanie"
        - git checkout master
        - git pull
        - git checkout -b mojezadanie2
        - szuru buru...
        - git add .
        - git commit -m "Moje zadanie 2"


        - Show "Please select playlist when nothing selected"
        - Remove playlists when X clicked
        - Create new playlist
            - Show Empty form when button [ Create new playlist ] cliked
            - Cancel... go back to details.
            - Save - add new playlist to list and select in in details.
    */

    const edit = () => {
        setMode('form');
        setShowInfoToSelectPlaylist(false);
    }
    const cancel = () => {
        setMode('details');
        setShowInfoToSelectPlaylist(false);
    }
    const save = (draft: Playlist) => {
        setMode('details')
        setPlaylists(playlists.map(p => p.id === draft.id ? draft : p))
    }
    const selectPlaylist = (id: string) => {
        setMode('details');
        setSelectedId(id);
        setShowInfoToSelectPlaylist(false);
    }
    const createNewPlaylist = () => {
        setShowInfoToSelectPlaylist(false);
        setSelectedId(undefined);
        setMode('new');
        // setNewPlaylist();
    }
    const deletePlaylist = (playlistId: Number) => {
        setPlaylists(playlists.filter(p => +p.id !== playlistId));
    }
    const backToMainView = () => {
        setMode('default');
        setShowInfoToSelectPlaylist(true);
    }
    const addNewPlaylist = (newPlaylist: Playlist) => {
        setPlaylists([...playlists, newPlaylist]);
        setSelectedId(newPlaylist.id);
        setMode('details');
    }

    useEffect(() => {
        setSelectedPlaylist(playlists.find(p => p.id === selectedId));
        setShowInfoToSelectPlaylist(selectedPlaylist?.id ? false : true);
    }, [selectedId, selectedPlaylist, playlists])

    return (
        <div>
            <h4>PlaylistsView</h4>
            {/* .row>.col*2 */}
            <div className="row">
                <div className="col">
                    <PlaylistList
                        onSelected={selectPlaylist}
                        playlists={playlists}
                        selectedId={selectedId}
                        onDeletePlaylist={deletePlaylist}
                    />

                    <button
                        className="btn btn-info btn-block mt-4"
                        onClick={createNewPlaylist}
                    >
                        Create New Playlist
                    </button>
                </div>
                <div className="col">
                    {selectedPlaylist && mode === 'details' &&
                        <PlaylistDetails
                            edit={edit}
                            playlist={selectedPlaylist}
                        />
                    }
                    {selectedPlaylist && mode === 'form' &&
                        <PlaylistEditForm
                            save={save}
                            playlist={selectedPlaylist}
                            cancel={cancel}
                        />
                    }
                    {mode === 'new' &&
                        <PlaylistCreateNewPlaylist
                            onAddPlaylist={(playlist) => { addNewPlaylist(playlist) }}
                            cancel={backToMainView}
                        />

                    }
                    {showInfoToSelectPlaylist && mode !== 'new' &&
                        <div className="alert alert-info">Please select playlist</div>
                    }
                </div>
            </div>
        </div>
    )
}
