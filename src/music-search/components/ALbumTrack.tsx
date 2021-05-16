import React, { ReactElement, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { msToTime } from '../../core/helpers/functions'
import { trackAddToSelectedPlaylist } from '../../core/reducers/TracksReducer'
import { Track } from '../../model/Search'

interface Props {
    tracks: {
        items: Track[]
    }
}

export default function ALbumTrack({ tracks }: Props): ReactElement {
    const dispatch = useDispatch()
    const addTrackToSelectedPlaylist = useCallback((track: Track) => { dispatch(trackAddToSelectedPlaylist(track)) }, [])

    return (
        <>
            {tracks.items.map((track, index) =>
                <tr key={track.track_number}>
                    <th scope="row">{++index}</th>
                    <td>
                        <a href={track.external_urls.spotify}>{track.name}</a>
                    </td>
                    <td className="d-flex justify-content-center text-nowrap">
                        {msToTime(track.duration_ms)}
                    </td>
                    <td>
                        <span className="material-icons cursor-pointer" onClick={() => addTrackToSelectedPlaylist(track)}>
                            add
                        </span>
                    </td>
                </tr>
            )}
        </>
    )
}