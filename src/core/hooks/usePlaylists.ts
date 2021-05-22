import axios from "axios"
import { Playlist } from "../../model/Playlist"
import { Album, PagingObject } from "../../model/Search"
import { useFetch } from "./useFetch"


// export const usePlaylists = (): [{ isLoading: boolean, message: string, results: Playlist[] | null }, Function] => {

export const fetchPlaylists = (): Promise<Playlist[]> => {
    // throw Error('Not implemented yet!!!')
    // // useFetch(() => axios.get())

    return axios.get<PagingObject<Playlist>>('https://api.spotify.com/v1/me/playlists').then(resp => resp.data.items)

}

export const updatePlaylistDetails = (draft: Playlist) => {
    return axios.put(`https://api.spotify.com/v1/playlists/${draft.id}`, {
        name: draft.name,
        public: draft.public,
        description: draft.description,
    }).then(() => draft)
}


export const fetchPlaylist = (id: Playlist['id']): Promise<Playlist> => {
    return axios.get<Playlist>('https://api.spotify.com/v1/playlists/' + id).then(resp => resp.data)
}


export const fetchAlbumById = (id: Album['id']): Promise<Album> => {
    return axios.get<Album>('https://api.spotify.com/v1/albums/' + id)
        .then(resp => resp.data)
}