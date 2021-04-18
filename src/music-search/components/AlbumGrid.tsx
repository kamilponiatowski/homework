import React from 'react'
import { AlbumCard } from './AlbumCard'
import { AlbumView } from '../../model/Search'

interface Props {
    albums: AlbumView[]
}

export const AlbumGrid = ({ albums }: Props) => {


    return (
        <div>
            <div className="row row-cols-1 row-cols-sm-4 no-gutters">
                {albums.map((album, index) =>
                    <div className="col mb-4">
                        <AlbumCard
                            album={album}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
