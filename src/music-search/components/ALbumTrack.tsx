import React, { ReactElement } from 'react'
import { msToTime } from '../../core/helpers/functions'
import { Track } from '../../model/Search'

interface Props {
    tracks: {
        items: Track[]
    }
}

export default function ALbumTrack({ tracks }: Props): ReactElement {
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
                        <span className="material-icons">
                            add
                        </span>
                    </td>
                </tr>)}
        </>
    )
}
