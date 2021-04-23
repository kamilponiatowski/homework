import React, { useCallback, useState } from 'react';
import { PlaylistsView } from './playlists/containers/PlaylistsView';

// npm i bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import { MusicSearchView } from './music-search/containers/MusicSearchView';
import { NavigationMusicApp } from './navigation/NavigationMusicApp';
import { fetchAlbums, fetchArtists } from './core/hooks/useSearchAlbums';
// fetchArtists
// fetchAlbums
function App() {
  const [tab, setTab] = useState<string>('album'); // album, artist, playlist, track, show, episode _______ own-playlist
  const fetchMethod = useCallback(
    () => {
      if (!tab) return
      switch (tab) {
        case 'album': {
          return fetchAlbums;
        }
        case 'artist': {
          return fetchArtists;
        }
        default: {
          return fetchAlbums;
        }
      }
    },
    [tab],
  )

  return (
    <div>
      {/* .container>.row>.col */}
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
                  fetchMethod={fetchMethod}
                />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
