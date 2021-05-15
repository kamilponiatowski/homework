import React from 'react'
import { SearchForm } from '../../core/components/SearchForm'
import { Track } from '../../model/Search'
import SelectPlaylist from '../components/SelectPlaylist'
import TrackDetails from '../components/TrackDetails'
import TrackForm from '../components/TrackForm'
import TracksList from '../components/TracksList'

interface Props {

}

export const PlaylistTracksHooks = (props: Props) => {
    // TODO:
    // - store state
    // - store actions
    // - select from store
    //      - playlists,  
    //      - selected playlist, 
    //      - selected plalyist tracks
    //      - selected track
    // - dispatch to store
    //      - load playlists,
    //      - select playlist, 
    //      - select track, 
    //      - update track
    // ???

    return (

        <div>
            PlaylistTracks

            <div className="row">
                <div className="col">
                    <SearchForm onSearch={() => { }} query='' />
                    <SelectPlaylist playlists={[]} onSelect={() => { }} />
                    <hr />

                    <TracksList tracks={[]} selected={undefined} onSelect={() => { }} />
                </div>
                <div className="col">
                    {false && <TrackDetails track={{} as Track} />}

                    {false && <>
                        <TrackForm track={{} as Track} onSave={() => { }} />
                    </>}

                </div>
            </div>
        </div>
    )
}
