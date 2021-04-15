import axios from 'axios'
import { Playlist } from '../model/Playlist'

const api = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const PlaylistStateService = class {
  getPlaylists(): Promise<Playlist[]> {
    return api.get('/playlists')
      .then(({ data }) => data)
  }
  getPlaylist(id: Number): Promise<any> {
    return api.get(`/playlists/${id}`)
      .then(({ data }) => data)
  }
  putPlaylist(playlist: Playlist): Promise<any> {
    return api.put(`/playlists/${playlist.id}`, playlist)
      .then(({ data }) => data)
  }
  postPlaylist(playlist: Playlist): Promise<any> {
    return api.post(`/playlists`, playlist)
      .then(({ data }) => data)
  }
  deletePlaylist(id: Number): Promise<any> {
    return api.delete(`/playlists/${id}`)
      .then(({ data }) => data)
  }
}

export default new PlaylistStateService();


// {
//     "playlists": [
//         {
//             "id": 123,
//             "name": "Relaxing 😎",
//             "public": true,
//             "description": "Sleep Music with Rain Sounds"
//         },
//         {
//             "id": 234,
//             "name": "Supernatural 🤠",
//             "public": false,
//             "description": "moze polubię TypeScript?. 🚀"
//         },
//         {
//             "id": 345,
//             "name": "Magic 🦄",
//             "public": true,
//             "description": "albo wszystko polubię co mi tam 😅💖"
//         }
//     ]
// }