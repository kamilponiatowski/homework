// tsrcc
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { SearchForm } from '../../core/components/SearchForm'
import { UserContext } from '../../core/contexts/UserContext'
import { Playlist } from '../../model/Playlist'
import { SimpleTrack, Track } from '../../model/Search'
import { store } from '../../store'
import SelectPlaylist from '../components/SelectPlaylist'
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'
import TracksList from '../components/TracksList'



interface Props extends RouteComponentProps {
    playlists: Playlist[]
    selectedPlaylist?: Playlist
    selectedTrack?: SimpleTrack
}
interface State { }


export default class PlaylistTracks extends Component<Props, State> {
    formRef = React.createRef<TrackForm>()

    static defaultProps = {
        playlists: [],
    }

    selectTrack = (track: SimpleTrack) => { }
    selectPlaylist = (playlist_id: Playlist['id']) => { }
    save = (draft: SimpleTrack) => { }
    reset = () => { }

    render() {
        return (
            <div>
                PlaylistTracks

                <div className="row">
                    <div className="col">
                        <SearchForm onSearch={() => this.setState({})} query='' />
                        <SelectPlaylist playlists={this.props.playlists} onSelect={this.selectPlaylist} />
                        <hr />

                        {this.props.selectedPlaylist?.tracks?.length &&
                            <TracksList tracks={this.props.selectedPlaylist!.tracks} selected={this.props.selectedTrack?.id} onSelect={this.selectTrack} />}
                    </div>
                    <div className="col">
                        {this.props.selectedTrack && <TrackDetails track={this.props.selectedTrack} />}

                        {this.props.selectedTrack && <>
                            <TrackForm track={this.props.selectedTrack} onSave={this.save} ref={this.formRef} />
                            <button className="btn btn-danger" onClick={this.reset}>Reset</button>
                        </>}

                    </div>
                </div>
            </div>
        )
    }
}




// const playlistsData: Playlist[] = [
//     {
//         id: '123',
//         name: 'Playlista 😇',
//         public: true,
//         description: 'no i co ja dzis polubie?..🤔',
//         tracks: [
//             { id: '123', name: 'Track 123' },
//             { id: '234', name: 'Track 234' },
//             { id: '345', name: 'Track 345' },
//         ]
//     },
//     {
//         id: '234',
//         name: 'Playlista 😁',
//         public: false,
//         description: 'moze polubię TypeScript?. 🚀',
//         tracks: [
//             { id: '123a', name: 'Track ABC' },
//             { id: '234d', name: 'Track DEF' },
//             { id: '345b', name: 'Track GHI' },
//         ]
//     },
//     {
//         id: '345',
//         name: 'Playlista 😆',
//         public: true,
//         description: 'albo wszystko polubię co mi tam 😅💖',
//         tracks: [
//             { id: '123d', name: 'Track XYZ' },
//         ]
//     },
// ]
