import axios from 'axios';
import { useState } from 'react';
import { AlbumsSearchResponse, AlbumView, Artist, ArtistsSearchResponse } from '../../model/Search';
import { auth } from '../services';


export const SearchInSpotify = (api_url: string, tab: string) => {
    const [results, setResults] = useState<AlbumView[] | Artist[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const search = async (query: string) => {
        try {
            setResults([]);
            setMessage('');
            setIsLoading(true);

            if (tab === 'album') {
                const response = await axios.get<AlbumsSearchResponse>(api_url, {
                    headers: { Authorization: 'Bearer ' + auth.token },
                    params: { q: query, type: tab },
                });

                setResults(response.data.albums.items);
            }

            if (tab === 'artists') {
                const response = await axios.get<ArtistsSearchResponse>(api_url, {
                    headers: { Authorization: 'Bearer ' + auth.token },
                    params: { q: query, type: 'artist' },
                });
                console.log(response)
                setResults(response.data.artists.items);
            }
        }
        catch (error) { setMessage(error.message); }
        finally { setIsLoading(false); }
    };

    return {
        search,
        isLoading,
        message,
        results
    };
};
