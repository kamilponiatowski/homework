import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SearchForm } from '../../core/components/SearchForm'
import { selectPlaylist, selectPlaylists, selectSelectedPlaylistTracks, selectSelectedTrack, tracksPlaylistsSelect, tracksSelect, tracksUpdate } from '../../core/reducers/TracksReducer'
import { SimpleTrack, Track } from '../../model/Search'
import SelectPlaylist from '../components/SelectPlaylist'
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'
import TracksList from '../components/TracksList'


interface Props {}

export const PlaylistTracksHooks = (props: Props) => {
    const dispatch = useDispatch()

    const actions = useMemo(() => bindActionCreators({
        tracksPlaylistsSelect,
        tracksSelect,
        tracksUpdate,
    }, dispatch), [])


    const playlists = useSelector(selectPlaylists)
    const selectedPlaylist = useSelector(selectPlaylist)
    const selectedPlaylistTracks = useSelector(selectSelectedPlaylistTracks)
    const selectedTrack = useSelector(selectSelectedTrack)

    const selectPlaylistById = useCallback((id: string) => { dispatch(tracksPlaylistsSelect(id)) }, [])
    const updateTrack = useCallback((draft: SimpleTrack) => { dispatch(tracksUpdate(draft)) }, [])

    return (
        <div>
            PlaylistTracks

            <div className="row">
                <div className="col">
                    <SelectPlaylist playlists={playlists} onSelect={selectPlaylistById} />
                    <hr />

                    {selectedPlaylist && <TracksList
                        tracks={selectedPlaylistTracks}
                        selected={selectedTrack?.id}
                        onSelect={actions.tracksSelect} />}
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
