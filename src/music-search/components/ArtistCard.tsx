import React from 'react'
import { Artist } from '../../model/Search'
import styles from './ArtistCard.module.css'

interface Props {
    artist: Artist
}

export const ArtistCard = ({ artist }: Props) => {
    return (
        <div className="card h-100">
            <img src={artist.images[1] ? artist.images[1].url : 'https://www.placecage.com/gif/300/300'} className="card-img-top" alt={artist.name} />
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{artist.name}</h5>
                {
                    artist?.followers &&
                    <div>
                        <div className="border-top my-1"></div>
                        <div className="d-flex justify-content-center">
                            <span className={`fa fa-star ${artist.popularity >= 10 ? styles.checked : ''}`}></span>
                            <span className={`fa fa-star ${artist.popularity >= 25 ? styles.checked : ''}`}></span>
                            <span className={`fa fa-star ${artist.popularity >= 45 ? styles.checked : ''}`}></span>
                            <span className={`fa fa-star ${artist.popularity >= 65 ? styles.checked : ''}`}></span>
                            <span className={`fa fa-star ${artist.popularity >= 85 ? styles.checked : ''}`}></span>
                        </div>
                        <div className="border-top my-1"></div>
                        <div className="row">
                            <div className="col">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1">{artist.followers.total}</h4>
                                    <p className="m-0">Followers</p>
                                </div>
                            </div>
                        </div>
                    </div >
                }
            </div >
        </div >
    )
}
