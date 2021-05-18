import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './core/services';
import { auth } from './core/services';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './core/contexts/UserContext';
import { store } from './store';
import { Playlist } from './model/Playlist';
import { Provider } from 'react-redux';
import { tracksPlaylistsLoad } from './core/reducers/TracksReducer';

(window as any).store = store;

auth.init();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals()

const data: Playlist[] = [
  {
    id: '123',
    name: 'Playlista 😇',
    public: true,
    description: 'no i co ja dzis polubie?..🤔',
    tracks: [
      { id: '123', name: 'Track ABC' },
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
      { id: '123', name: 'Track ABC' },
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

store.dispatch(tracksPlaylistsLoad(data))