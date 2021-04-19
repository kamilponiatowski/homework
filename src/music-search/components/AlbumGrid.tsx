import React from 'react'
import { AlbumView, Artist, ArtistView } from '../../model/Search'
import { AlbumCard } from './AlbumCard'

interface Props {
    albums: AlbumView[] | ArtistView[] | Artist[]
}

export const AlbumGrid = ({ albums }: Props) => {
    return (
        <div>
            <div className="row row-cols-1 row-cols-sm-4 no-gutters">
                {albums.map((album: any) => <div className="col mb-4" key={album.id}>
                    <AlbumCard album={album} />
                </div>)}
            </div>
        </div>
    )
}
