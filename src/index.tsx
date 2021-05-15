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
    name: 'Playlista 😇',
    public: true,
    description: 'no i co ja dzis polubie?..🤔'
  },
  {
    id: '234',
    name: 'Playlista 😁',
    public: false,
    description: 'moze polubię TypeScript?. 🚀'
  },
  {
    id: '345',
    name: 'Playlista 😆',
    public: true,
    description: 'albo wszystko polubię co mi tam 😅💖'
  },
]
store.dispatch(playlistsLoad(data))