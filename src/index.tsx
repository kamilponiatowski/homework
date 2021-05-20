import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './core/services';
import { auth } from './core/services';
// import { HashRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './core/contexts/UserContext';
import { store } from './store';
import { playlistsLoad } from './core/reducers/PlaylistsReducer';
import { Playlist } from './model/Playlist';
import { Provider } from 'react-redux';
import { tracksLoad, tracksPlaylistsLoad } from './core/reducers/TracksReducer';

(window as any).store = store;

// store.subscribe(()=> console.log(store.getState()) )

// store.dispatch({type:'INC', payload:42}) 

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

// window.React = React;
// window.ReactDOM = ReactDOM;

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

reportWebVitals()



const data: Playlist[] = [
  {
    id: '123',
    name: 'Playlista Redux 123 😇',
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
    name: 'Playlista  Redux 234 😁',
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
    name: 'Playlista  Redux 345 😆',
    public: true,
    description: 'albo wszystko polubię co mi tam 😅💖',
    tracks: [
      { id: '123d', name: 'Track XYZ' },
    ]
  },
]
// store.dispatch(tracksLoad(data[0].tracks!))
// store.dispatch(tracksLoad(data[1].tracks!))
// store.dispatch(tracksLoad(data[2].tracks!))
store.dispatch(tracksPlaylistsLoad(data))
// store.dispatch(playlistsLoad(data))