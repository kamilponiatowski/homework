import React, { ReactElement } from 'react'
import { AlbumTrack } from '.'
import { PagingObject, Track } from '../../model/Search'

interface Props {
    tracks: PagingObject<Track> | undefined
}

export default function AlbumTracks({ tracks }: Props): ReactElement {
    return (
        <>
            <h3 className="mt-2">Tracks {tracks?.total ? `(${tracks.total})` : null}</h3>
            {tracks &&
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">
                                <div className="d-flex justify-content-center">
                                    <span className="material-icons">
                                        schedule
                                            </span>
                                </div>
                            </th>
                            <th scope="col">Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AlbumTrack tracks={tracks}></AlbumTrack>
                    </tbody>
                </table>
            }
            {!tracks &&
                <div className="alert alert-info" role="alert">
                    No tracks to display
                </div>
            }
        </>
    )
}
