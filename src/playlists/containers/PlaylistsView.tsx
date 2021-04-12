// tsrafc
import React, { useEffect, useState } from 'react'
import { Playlist } from '../../model/Playlist'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistEditForm } from '../components/PlaylistEditForm'
import { PlaylistList } from '../components/PlaylistList'

interface Props { }

// const playlist = {
//     id: '123',
//     name: 'Placki',
//     public: true,
//     description: 'Lubie placki'
// }

const playlists: Playlist[] = [
    {
        id: '123',
        name: 'Playlista 123',
        public: true,
        description: 'Lubie placki'
    },
    {
        id: '234',
        name: 'Playlista 234',
        public: false,
        description: 'Lubie placki'
    },
    {
        id: '345',
        name: 'Playlista 345',
        public: true,
        description: 'Lubie placki'
    },

]

export const PlaylistsView = (props: Props) => {
    const [myPlaylists, setMyPlaylists] = useState<Playlist[]>(playlists)
    const [forceUpdate, setForceUpdate] = useState(Date.now())
    const [selectedId, setSelectedId] = useState<string | undefined>('234')
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | undefined>()
    const [mode, setMode] = useState<'details' | 'form'>('details')

    /* TODO:
        - Przycisk Edit w Details "przełącza" na formularza (*zmiana mode! props!)
        - Przycisk Cancel w Formularzu "przełącza" na details (*zmiana mode! props!)
        - Przycisk Save w Formularzu:
            - "przełącza" na details (*zmiana mode! props!)
            - przekazuje Draft (szkic / nizapisane dane playlisty *props!) do PlaylistsView
            - PlaylistsView podmienia szkic na liście playlist (! Immutable - kopia renderuje!)

        - Zapisana playlista jest widoczna na liscie i w details!
    */

    const edit = (value: 'details' | 'form') => { setMode(value) }
    const cancel = (value: 'details' | 'form') => { setMode(value) }
    const save = (draft: Playlist) => {
        const index = myPlaylists!.findIndex(p => p.id === draft.id)
        if (~index) {
            // playlists[index] = draft /// WRONG!! Mutable Code!
            const myNewPlaylist = JSON.parse(JSON.stringify(myPlaylists));
            myNewPlaylist!.splice(index, 1);
            myNewPlaylist!.splice(index, 0, draft);
            setMyPlaylists(myNewPlaylist);
            setMode('details');
        }
    }


    useEffect(() => {
        setSelectedPlaylist(myPlaylists.find(p => p.id === selectedId))
    }, [selectedId, forceUpdate, myPlaylists])

    return (
        <div>
            <h4>PlaylistsView</h4>

            <div className="row">
                <div className="col">
                    <PlaylistList
                        onSelected={id => { setSelectedId(id) }}
                        playlists={myPlaylists}
                        selectedId={selectedId}
                        onSwitch={(value) => { setMode(value) }}
                    />

                </div>
                <div className="col">

                    {selectedPlaylist && mode === 'details' &&
                        <PlaylistDetails
                            playlist={selectedPlaylist}
                            onEdit={edit}
                        />
                    }

                    {selectedPlaylist && mode === 'form' &&
                        <PlaylistEditForm
                            playlist={selectedPlaylist}
                            onCancel={cancel}
                            onSave={save}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
