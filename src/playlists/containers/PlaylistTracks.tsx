// tsrcc
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { SearchForm } from '../../core/components/SearchForm'
import { UserContext } from '../../core/contexts/UserContext'
import { playlistsTrackRemove, selectPlaylists } from '../../core/reducers/PlaylistsReducer'
import { selectPlaylist, selectSelectedPlaylistTracks, selectSelectedTrack, tracksPlaylistsSelect, tracksUpdate, tracksSelect } from '../../core/reducers/TracksReducer'
import { Playlist } from '../../model/Playlist'
import { SimpleTrack, Track } from '../../model/Search'
import { AppState, store } from '../../store'
import SelectPlaylist from '../components/SelectPlaylist'
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'
import TracksList from '../components/TracksList'
import { connect, MapDispatchToPropsParam, MapStateToPropsParam } from 'react-redux' // <- read the docs!
import { bindActionCreators, Dispatch } from 'redux'


interface Props extends RouteComponentProps {
    playlists: Playlist[]
    selectedPlaylist?: Playlist
    selectedPlaylistTracks: SimpleTrack[]
    selectedTrack?: SimpleTrack
    playlistsTrackRemove(id: string): any
    tracksSelect(track: SimpleTrack): any
    tracksPlaylistsSelect(id: string): any
    tracksUpdate(draft: SimpleTrack): any
}
interface State { }


export default class PlaylistTracks extends Component<Props, State> {
    formRef = React.createRef<TrackForm>()

    render() {
        return (
            <div>
                PlaylistTracks
                <div className="row">
                    <div className="col">
                        <SelectPlaylist playlists={this.props.playlists} onSelect={this.props.tracksPlaylistsSelect} />
                        <hr />
                        {this.props.selectedPlaylist?.tracks?.length &&
                            <TracksList tracks={this.props.selectedPlaylistTracks}
                                selected={this.props.selectedTrack?.id}
                                onSelect={this.props.tracksSelect}
                                onRemove={this.props.playlistsTrackRemove} />}
                    </div>
                    <div className="col">
                        {this.props.selectedTrack && <TrackDetails track={this.props.selectedTrack} />}
                        {this.props.selectedTrack && <>
                            <TrackForm track={this.props.selectedTrack} onSave={this.props.tracksUpdate} ref={this.formRef} />
                        </>}
                    </div>
                </div>
            </div>
        )
    }
}


export const PlaylistTracksWithRedux = connect(
    (state: AppState, ownProps) => ({
        playlists: selectPlaylists(state),
        selectedPlaylist: selectPlaylist(state/* , ownProps.match.params.playlist_id */),
        selectedTrack: selectSelectedTrack(state),
        selectedPlaylistTracks: selectSelectedPlaylistTracks(state)
    }),
    (dispatch: Dispatch, ownProps: {}) => bindActionCreators({
        tracksPlaylistsSelect,
        playlistsTrackRemove,
        tracksSelect,
        tracksUpdate
    }, dispatch),
    // (stateProps: PropsFromState, dispatchProps: TDispatchProps, ownProps: PropsNotFromState) => ({ ... })
)(PlaylistTracks)


// type PropsFromState = { playlists: Playlist[] };
// type PropsNotFromState = RouteComponentProps

// const mapStateToProps: MapStateToPropsParam<PropsFromState, PropsNotFromState, AppState> = (state, ownProps) => ({
//     playlists: selectPlaylists(state),
//     selectedPlaylist: selectPlaylist(state/* , ownProps.match.params.playlist_id */),
//     selectedTrack: selectSelectedTrack(state),
//     selectedPlaylistTracks: selectSelectedPlaylistTracks(state)
// })

// type TDispatchProps = {
//     tracksPlaylistsSelect(id: string): any,
//     tracksUpdate(draft: SimpleTrack): any,
// }
// const mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, PropsNotFromState> = (
//     dispatch: Dispatch, ownProps: PropsNotFromState
// ) => ({
//     tracksPlaylistsSelect: (id: string) => { dispatch(tracksPlaylistsSelect(id)) },
//     tracksUpdate: (draft: SimpleTrack) => { dispatch(tracksUpdate(draft)) }
// })

// // const withPlaylistsRedux = connect(mapStateToProps)
// // export const PlaylistTracksWithRedux = withPlaylistsRedux(PlaylistTracks)

// export const PlaylistTracksWithRedux = connect(
//     mapStateToProps,
//     mapDispatchToProps,
//     // (stateProps: PropsFromState, dispatchProps: TDispatchProps, ownProps: PropsNotFromState) => ({ ... })
// )(PlaylistTracks)




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
