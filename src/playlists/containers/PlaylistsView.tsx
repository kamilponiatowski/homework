// tsrafc
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React, { useEffect, useState } from 'react'
import { Playlist } from '../../model/Playlist'
import { PlaylistDetails } from '../components/PlaylistDetails'
import { PlaylistEditForm } from '../components/PlaylistEditForm'
import { PlaylistList } from '../components/PlaylistList'
import { PlaylistCreateNewPlaylist } from '../components/PlaylistCreateNewPlaylist'
import PlaylistService from '../../services/PlaylistService'

interface Props { }

export const PlaylistsView = (props: Props) => {
    const [selectedId, setSelectedId] = useState<string | undefined>()
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | undefined>()
    const [mode, setMode] = useState<'details' | 'form' | 'new' | 'default'>('default')
    const [playlists, setPlaylists] = useState<Playlist[]>([])
    const [showInfoToSelectPlaylist, setShowInfoToSelectPlaylist] = useState<Boolean>(true)
    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const getPlaylistsFromAPI = async () => {
        setIsLoading(true);
        const playlists = await PlaylistService.getPlaylists();
        setPlaylists(playlists);
        setTimeout(() => setIsLoading(false), 250)
    }
    const edit = () => {
        setMode('form');
        setShowInfoToSelectPlaylist(false);
    }
    const cancel = () => {
        setMode('details');
        setShowInfoToSelectPlaylist(false);
    }
    const save = async (draft: Playlist) => {
        setMode('details')
        await PlaylistService.putPlaylist(draft);
        getPlaylistsFromAPI();
    }
    const selectPlaylist = (id: string) => {
        setMode('details');
        setSelectedId(id === selectedId ? undefined : id);
        setShowInfoToSelectPlaylist(false);
    }
    const createNewPlaylist = () => {
        setShowInfoToSelectPlaylist(false);
        setSelectedId(undefined);
        setMode('new');
    }
    const addNewPlaylist = async (newPlaylist: Playlist) => {
        await PlaylistService.postPlaylist(newPlaylist);
        setSelectedId(newPlaylist.id);
        setMode('details');
        getPlaylistsFromAPI();
    }
    const deletePlaylist = async (playlistId: Number) => {
        await PlaylistService.deletePlaylist(playlistId)
        getPlaylistsFromAPI();
    }
    const backToMainView = () => {
        setMode('default');
        setShowInfoToSelectPlaylist(true);
    }
    const deselectList = (e: any) => {
        !e.composedPath().find((e: HTMLElement) => {
            const deselect = (
                e.matches?.('#playlist-list')
                || e.matches?.('#playlist-edit-form')
                || e.matches?.('#playlist-details')
            )
            return deselect;
        }) && setSelectedId(undefined);
    }

    useEffect(() => {
        setSelectedPlaylist(playlists.find(p => p.id === selectedId));
        setShowInfoToSelectPlaylist(selectedPlaylist?.id ? false : true);
    }, [selectedId, selectedPlaylist, playlists])

    useEffect(function () {
        window.addEventListener('click', deselectList);
        getPlaylistsFromAPI();

        return () => {
            window.removeEventListener('click', deselectList);
        }
    }, [])

    const PlaylistListComponent = (
        !isLoading &&
        <PlaylistList
            playlists={playlists}
            selectedId={selectedId}
            onSelected={selectPlaylist}
            onDeletePlaylist={deletePlaylist}
        />
    )

    const PlaylistDetailsComponent = (
        selectedPlaylist && mode === 'details' &&
        <PlaylistDetails
            onEdit={edit}
            playlist={selectedPlaylist}
        />
    )

    const PlaylistEditFormComponent = (
        selectedPlaylist && mode === 'form' &&
        <PlaylistEditForm
            playlist={selectedPlaylist}
            onCancel={cancel}
            onSave={save}
        />
    )

    const PlaylistCreateNewPlaylistComponent = (
        mode === 'new' &&
        <PlaylistCreateNewPlaylist
            onCancel={backToMainView}
            onAddPlaylist={(playlist) => { addNewPlaylist(playlist) }}
        />
    )

    const CreateNewPlaylistButtonComponent = (
        <button
            className="btn btn-info btn-block mt-4"
            onClick={createNewPlaylist}
        >
            Create New Playlist
        </button>
    )

    const ShowInfoToSelectPlaylistComponent = (
        showInfoToSelectPlaylist && mode !== 'new' &&
        <div className="alert alert-info">Please select playlist or create a new one</div>
    )
    const LoaderComponent = (
        isLoading &&
        <div className="mx-auto">
            <Loader
                type="TailSpin"
                color="#00BFFF"
                height={80}
                width={80}
                timeout={3000}
            />
        </div>
    )

    return (
        <div id="playlist-view">
            <h4>PlaylistsView</h4>
            <div className="row">
                <div className="col playlists-list d-flex flex-column justify-content-center">
                    {PlaylistListComponent}
                    {LoaderComponent}
                    {CreateNewPlaylistButtonComponent}
                </div>
                <div className="col">
                    {PlaylistDetailsComponent}
                    {PlaylistEditFormComponent}
                    {PlaylistCreateNewPlaylistComponent}
                    {ShowInfoToSelectPlaylistComponent}
                </div>
            </div>
        </div>
    )
}
