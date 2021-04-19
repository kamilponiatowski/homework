import React from 'react'
import { AlbumGrid } from '../components/AlbumGrid'
import { SearchForm } from '../components/SearchForm'
import { SearchInSpotify } from '../../core/hooks/useSearchAlbums'

interface Props {
    tab: string
}

/* TODO:
    - W AppComponent - przelaczane widoki jako zakladki do wyboru - "Szukaj Albumow" i "Szukaj Artystow" 
    ( + opcjonalnie zakladka "Playlisty" z PlaylistView ) https://getbootstrap.com/docs/4.6/components/navs/#tabs
    - Wyszukiwarka Artystow - {"q": "Bon Jovi", "type":"artist"}
    - Wykorzystaj ponownie Formularz wyszukiwania na nowym ekranie!
    - Wyniki w formie Card Grid lub Table lub list... (dowolnie)
    
    // Konto Spotify:
    // holoyis165 @ bulkbye . com
    // placki 777
    
    // Nie zmienamy nic w services / auth.

    - https://developer.spotify.com/documentation/web-api/reference/#endpoint-search
*/

export const MusicSearchView = ({ tab }: Props) => {
    // const { searchAlbums, isLoading, message, results } = useSearchAlbums('http://localhost:3000/data/albums.json')

    const {
        search,
        isLoading,
        message,
        results
    } = SearchInSpotify('https://api.spotify.com/v1/search', tab)

    return (
        <div>
            <div className="row">
                <div className="col">
                    <SearchForm
                        onSearch={search}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoading && <p className="alert alert-info">Loading</p>}
                    {message && <p className="alert alert-danger">{message}</p>}

                    <AlbumGrid albums={results} />
                </div>
            </div>
        </div>
    )
}
