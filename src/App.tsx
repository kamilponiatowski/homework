import React, { useState } from 'react';
import { PlaylistsView } from './playlists/containers/PlaylistsView';

import 'bootstrap/dist/css/bootstrap.css'
import { MusicSearchView } from './music-search/containers/MusicSearchView';
import { NavigationMusicApp } from './navigation/NavigationMusicApp';

function App() {
  const [tab, setTab] = useState<string>('album'); // album, artist, playlist, track, show, episode _______ own-playlist

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">

            <h1>MusicApp</h1>
            <NavigationMusicApp currentTab={tab} onChangeTab={(newTab: string) => setTab(newTab)} />

            {
              tab === 'own-playlist'
                ? <PlaylistsView />
                : <MusicSearchView
                  tab={tab}
                />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
