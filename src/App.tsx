import React from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import { MusicSearchView } from './music-search/containers/MusicSearchView';

import { Redirect, Route, Switch } from 'react-router'
import { NavBar } from './core/components/NavBar';
import { PlaylistsReduxView } from './playlists/containers/PlaylistsReduxView';
import { PlaylistTracksHooks } from './playlists/containers/PlaylistTracksHooks';
import { AlbumDetails } from './music-search/containers/AlbumDetails';

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col">

            <Switch>
              <Redirect path="/" exact={true} to="/playlists" />
              <Route path="/playlists/:playlist_id/" component={PlaylistsReduxView} />
              <Route path="/albums/:album_id/" component={AlbumDetails} />
              <Route path="/playlists/" component={PlaylistsReduxView} />
              <Route path="/tracks/" component={PlaylistTracksHooks} />
              <Route path="/search" component={MusicSearchView} />
              <Route path="*" render={() => <h1>Page Not Found</h1>} />
            </Switch>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
