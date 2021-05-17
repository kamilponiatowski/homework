// tsrcc
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { SearchForm } from '../../core/components/SearchForm'
import { Playlist } from '../../model/Playlist'
import { SimpleTrack } from '../../model/Search'
import SelectPlaylist from '../components/SelectPlaylist'
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'
import { TracksList } from '../components/TracksList'


const playlistsData: Playlist[] = [
    {
        id: '123',
        name: 'Playlista 😇',
        public: true,
        description: 'no i co ja dzis polubie?..🤔',
        tracks: [
            { id: '123', name: 'Track 123' },
            { id: '234', name: 'Track 234' },
            { id: '345', name: 'Track 345' },
        ]
    },
    {
        id: '234',
        name: 'Playlista 😁',
        public: false,
        description: 'moze polubię TypeScript?. 🚀',
        tracks: [
            { id: '123a', name: 'Track ABC' },
            { id: '234d', name: 'Track DEF' },
            { id: '345b', name: 'Track GHI' },
        ]
    },
    {
        id: '345',
        name: 'Playlista 😆',
        public: true,
        description: 'albo wszystko polubię co mi tam 😅💖',
        tracks: [
            { id: '123d', name: 'Track XYZ' },
        ]
    },
]


interface Props extends RouteComponentProps {

}
interface State {
    playlists: Playlist[]
    selectedPlaylist?: Playlist
    selectedTrack?: SimpleTrack
}

export class MyBaseComponent<Props, State> extends React.Component<Props, State> {
    reusableBaseMethod() { }
}

export default class PlaylistTracks extends MyBaseComponent<Props, State> {
    state: State = {
        playlists: playlistsData,
        selectedPlaylist: playlistsData[0]
    }

    selectTrack = (track: SimpleTrack) => {
        this.setState({ selectedTrack: track })
    }

    placki = 123

    selectPlaylist = (playlist_id: Playlist['id']) => {
        this.setState({
            selectedPlaylist: this.state.playlists.find(p => p.id === playlist_id),
            selectedTrack: undefined
        })
    }

    save = (draft: SimpleTrack) => {

        this.setState((prevState: State) => {
            return {
                selectedPlaylist: {
                    ...prevState.selectedPlaylist!,
                    tracks: prevState.selectedPlaylist?.tracks?.map(t => t.id === draft.id ? draft : t) || []
                }
            }
        }, () => { })


        this.setState((prevState: State) => {
            return {
                playlists: prevState.playlists.map(p => p.id !== prevState.selectedPlaylist?.id ? p : prevState.selectedPlaylist!),
            }
        }, () => { })

        this.reusableBaseMethod()
    }

    formRef = React.createRef<TrackForm>()

    reset = () => {
        this.formRef.current?.resetForm()
    }

    render() {
        console.log('render', this.state.selectedPlaylist?.tracks![0].name)
        return (
            <div>
                PlaylistTracks

                <div className="row">
                    <div className="col">
                        <SearchForm onSearch={() => this.setState({})} query='' />
                        <SelectPlaylist playlists={this.state.playlists} onSelect={this.selectPlaylist} />
                        <hr />

                        {this.state.selectedPlaylist?.tracks?.length &&
                            <TracksList tracks={this.state.selectedPlaylist!.tracks} selected={this.state.selectedTrack?.id} onSelect={this.selectTrack} />}
                    </div>
                    <div className="col">
                        {this.state.selectedTrack && <TrackDetails track={this.state.selectedTrack} />}

                        {this.state.selectedTrack && <>
                            <TrackForm track={this.state.selectedTrack} onSave={this.save} ref={this.formRef} />
                            <button className="btn btn-danger" onClick={this.reset}>Reset</button>
                        </>}

                    </div>
                </div>
            </div>
        )
    }
}
