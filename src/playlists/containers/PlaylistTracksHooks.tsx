import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlaylist, selectPlaylists, selectSelectedPlaylistTracks, selectSelectedTrack, tracksPlaylistsSelect, tracksSelect, tracksUpdate } from '../../core/reducers/TracksReducer'
import { SimpleTrack, Track } from '../../model/Search'
import SelectPlaylist from '../components/SelectPlaylist'
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'
import { TracksList } from '../components/TracksList'

interface Props {

}

export const PlaylistTracksHooks = (props: Props) => {
    const dispatch = useDispatch()

    const playlists = useSelector(selectPlaylists)
    const selectedPlaylist = useSelector(selectPlaylist)
    const selectedPlaylistTracks = useSelector(selectSelectedPlaylistTracks)
    const selectedTrack = useSelector(selectSelectedTrack)

    const selectPlaylistById = useCallback((id: string) => { dispatch(tracksPlaylistsSelect(id)) }, [])
    const selectTrackById = useCallback((track: SimpleTrack | Track) => { dispatch(tracksSelect(track.id)) }, [])
    const updateTrack = useCallback((draft: SimpleTrack | Track) => { dispatch(tracksUpdate(draft)) }, [])

    return (

        <div>
            PlaylistTracks

            <div className="row">
                <div className="col">
                    <SelectPlaylist playlists={playlists.items} onSelect={selectPlaylistById} />
                    <hr />

                    {selectedPlaylist && <TracksList
                        tracks={selectedPlaylistTracks}
                        selected={selectedTrack?.id}
                        onSelect={selectTrackById} />}
                </div>
                <div className="col">
                    {selectedTrack && <TrackDetails track={selectedTrack} />}

                    {selectedTrack && <>
                        <TrackForm track={selectedTrack} onSave={updateTrack} />
                    </>}

                </div>
            </div>
        </div>
    )
}
