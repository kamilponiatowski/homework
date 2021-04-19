import React from 'react'
import { AlbumView } from '../../model/Search'

interface Props {
    album: AlbumView
}

export const AlbumCard = ({ album }: Props) => {
    return (
        <div className="card h-100">
            <img src={album.images[0] ? album.images[0].url : 'https://www.placecage.com/c/300/300'} className="card-img-top" alt={album.name} />
            <div className="card-body">
                <h5 className="card-title">{album.name}</h5>
            </div>
        </div>
    )
}
