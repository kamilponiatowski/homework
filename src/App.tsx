import React, { SyntheticEvent, useEffect, useState } from 'react';
import { PlaylistsView } from './playlists/containers/PlaylistsView';

// npm i bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import { MusicSearchView } from './music-search/containers/MusicSearchView';
import { NavigationMusicApp } from './navigation/NavigationMusicApp';

function App() {
  const [tab, setTab] = useState<string>('album') // albums, artists, playlists
  // const keys = ['ArrowLeft', 'ArrowRight', 'ControlRight']
  // const pressed: any = [];
  // const secretCode = 'ab';
  // const changeTab = (e: any) => {
  //   console.log(e)
  // }

  // useEffect(function () {
  //   // window.addEventListener('keydown', changeTab);
  //   // window.addEventListener('keyup', changeTab);
  //   window.addEventListener('keyup', (e) => {
  //     console.log(e.key);
  //     pressed.push(e.key);
  //     pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  //     if (pressed.join('').includes(secretCode)) {
  //       console.log('DING DING!');
  //     }
  //     console.log(pressed);
  //   });

  //   return () => {
  //     // window.removeEventListener('keydown', changeTab);
  //     // window.removeEventListener('keyup', changeTab);
  //   }
  // }, [])

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
              (tab === 'album' || tab === 'artists') &&
              <MusicSearchView tab={tab} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
