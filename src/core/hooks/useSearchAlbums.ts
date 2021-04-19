import axios from 'axios';
import { useState } from 'react';
import { AlbumsSearchResponse, AlbumView, Artist, ArtistsSearchResponse, ArtistView } from '../../model/Search';
import { auth } from '../services';


export const useSearchAlbums = (api_url: string) => {
    const [results, setResults] = useState<AlbumView[] | Artist[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const searchAlbums = async (query: string) => {
        try {
            setResults([]);
            setMessage('');
            setIsLoading(true);

            const response = await axios.get<AlbumsSearchResponse>(api_url, {
                headers: { Authorization: 'Bearer ' + auth.token },
                params: { q: query, type: 'album' },
            });

            setResults(response.data.albums.items);
        }
        catch (error) { setMessage(error.message); }
        finally { setIsLoading(false); }
    };

    const searchArtist = async (query: string) => {
        try {
            setResults([]);
            setMessage('');
            setIsLoading(true);

            const response = await axios.get<ArtistsSearchResponse>(api_url, {
                headers: { Authorization: 'Bearer ' + auth.token },
                params: { q: query, type: 'artist' },
            });
            console.log(response)
            setResults(response.data.artists.items);
        }
        catch (error) { setMessage(error.message); }
        finally { setIsLoading(false); }
    };

    return {
        searchAlbums,
        searchArtist,
        isLoading,
        message,
        results
    };
};
