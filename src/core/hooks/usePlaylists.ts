import axios from "axios"
import { Playlist, ResponsePlaylists } from "../../model/Playlist"
import { useFetch } from "./useFetch"


// export const usePlaylists = (): [{ isLoading: boolean, message: string, results: Playlist[] | null }, Function] => {

export const fetchPlaylists = (): Promise<Playlist[]> => {
    // throw Error('Not implemented yet!!!')
    // // useFetch(() => axios.get())

    return axios.get<ResponsePlaylists>('https://api.spotify.com/v1/me/playlists')
        .then(resp => resp.data.items)
}

export const fetchPlaylist = (playlist_id: string | number | undefined): Promise<Playlist[]> => {
    return axios.get<Playlist[]>(`https://api.spotify.com/v1/playlists/${playlist_id}`)
        .then(resp => resp.data);
    // .then(resp => resp.data.params.playlist_id)
}

export const updatePlaylist = (playlist_id: number): Promise<Playlist[]> => {
    return axios.get<Playlist[]>(`https://api.spotify.com/v1/me/playlists/${playlist_id}`)
        .then(resp => resp.data)
    // .then(resp => resp.data.params.playlist_id)
}
// rest.get('https://api.spotify.com/v1/me/:playlist_id', (req, res, ctx) => {
//     ctx.delay()
//     return res(ctx.json(req.params.playlist_id))
// }),
// rest.put('https://api.spotify.com/v1/me/:playlist_id', (req, res, ctx) => {
//     ctx.delay()
//     return res(ctx.json(req.params.playlist_id))
// }),