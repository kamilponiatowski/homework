import React from 'react'
import { AlbumCard } from '../components/AlbumCard'

interface Props {
    
}

export const AlbumDetails = (props: Props) => {
    // 5Tby0U5VndHW0SomYO7Id7

    // TODO:
    // Use Fake ID
    // Fetch data from server
    // Dispatch data to reducer
    // Display data + loading + error from reducer
    // Get ID from router

    return (
        <div>
            AlbumDetails

            <div className="row">
                <div className="col">
                    <h1>Album Title</h1>

                </div>
            </div>
            <div className="row">
                <div className="col">
                    {/* <AlbumCard /> */}
                </div>
                <div className="col">

                    <dl>
                        <dt>Album name:</dt>
                        <dd>...</dd>

                        <dt>Artist:</dt>
                        <dd>...</dd>
                    </dl>

                </div>
            </div>
        </div>
    )
}
