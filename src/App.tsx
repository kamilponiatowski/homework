import React, { useState } from 'react';
import { PlaylistsView } from './playlists/containers/PlaylistsView';

// npm i bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import { MusicSearchView } from './music-search/containers/MusicSearchView';
import { NavigationMusicApp } from './navigation/NavigationMusicApp';

function App() {
  const [tab, setTab] = useState<string>('albums') // albums, artists, playlists

  return (
    <div>
      {/* .container>.row>.col */}
      <div className="container">
        <div className="row">
          <div className="col">

            <h1>MusicApp</h1>
            <NavigationMusicApp currentTab={tab} onChangeTab={(newTab: string) => setTab(newTab)} />

            {
              tab === 'playlists' &&
              <PlaylistsView />
            }
            {
              (tab === 'albums' || tab === 'artists') &&
              <MusicSearchView tab={tab} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
