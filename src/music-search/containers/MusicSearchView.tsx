import React, { useCallback } from 'react'
import { fetchAlbums, fetchArtists } from '../../core/hooks/useSearchAlbums'
import { SearchView } from '../../core/components/SearchView'
import { ArtistCard } from '../components/ArtistCard'
import { AlbumCard } from '../components/AlbumCard'

interface Props {
    tab: string,
}

export const MusicSearchView = ({ tab }: Props) => {
    const { fetchMethod, card } = useCallback(
        () => {
            if (!tab) return
            switch (tab) {
                case 'album': {
                    return {
                        fetchMethod: fetchAlbums,
                        card: AlbumCard,
                    };
                }
                case 'artist': {
                    return {
                        fetchMethod: fetchArtists,
                        card: ArtistCard,
                    };
                }
                default: {
                    return {
                        fetchMethod: fetchAlbums,
                        card: AlbumCard,
                    };
                }
            }
        },
        [tab],
    )

    return (
        <SearchView
            fetchMethod={fetchMethod}
            card={card}
        />
    )
}
