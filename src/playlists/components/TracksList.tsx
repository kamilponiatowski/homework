import React, { Component } from 'react'
import { SimpleTrack, Track } from '../../model/Search'

interface Props {
    tracks: SimpleTrack[]
    selected?: SimpleTrack['id']
    onSelect(track: SimpleTrack): any
    onRemove?(track: SimpleTrack['id']): any
}
interface State {

}

const classes = (...classes: (string | false)[]) => classes.filter(Boolean).join(' ')

export default class TracksList extends Component<Props, State> {
    state = {}

    render() {
        return (
            <div>
                PlaylistTracks

                <div className="list-group">
                    {this.props.tracks.map(track =>
                        <div className={classes("list-group-item", this.props.selected === track.id && 'active')}
                            key={track.id}
                            onClick={() => this.props.onSelect(track)}>
                            {track.name}

                            {this.props.onRemove &&
                                <span className="close" onClick={() => this.props.onRemove && this.props.onRemove(track.id)}>&times;</span>
                            }
                        </div>)}
                </div>
            </div>
        )
    }
}
