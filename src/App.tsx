import React from 'react';
import { PlaylistsView } from './playlists/containers/PlaylistsView';

// npm i bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import { MusicSearchView } from './music-search/containers/MusicSearchView';
import { PlaylistsTDD } from './playlists/containers/PlaylistsTDD';

function App() {
  return (
    <div>
      {/* .container>.row>.col */}
      <div className="container">
        <div className="row">
          <div className="col">

            <h1>MusicApp</h1>
            <PlaylistsTDD />
            {/* <PlaylistsView /> */}
            {/* <MusicSearchView/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
