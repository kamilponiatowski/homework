import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import { selectTracks } from '../../core/reducers/TracksReducer'
import { SimpleTrack, Track } from '../../model/Search'

interface Props {
    tracks: SimpleTrack[] | Track[]
    selected?: SimpleTrack['id']
    onSelect(track: SimpleTrack | Track): void
}
interface State {

}

const classes = (...classes: (string | false)[]) => classes.filter(Boolean).join(' ')

export const TracksList = (props: Props) => {
    const tracks = useSelector(selectTracks)

    return (
        <div>
            PlaylistTracks

            <div className="list-group">
                {tracks.map((track: Track | SimpleTrack) =>
                    track && <div
                        className={classes("list-group-item", props.selected === track?.id && 'active')}
                        key={track.id}
                        onClick={() => props.onSelect(track)}>
                        {track.name}
                    </div>
                )}
            </div>
        </div>
    )
}
