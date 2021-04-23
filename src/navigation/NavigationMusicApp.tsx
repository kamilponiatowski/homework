import React, { ReactElement } from 'react'
import styles from './NavigationMusicApp.module.css'

interface Props {
    currentTab: string
    onChangeTab: (newTab: string) => void
}

export function NavigationMusicApp({ onChangeTab, currentTab }: Props): ReactElement {
    return (
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
                <button
                    className={`nav-link ${styles.cursorPointer} ${currentTab === 'album' ? 'active' : 'bg-transparent'}`}
                    onClick={e => onChangeTab('album')}
                >
                    Szukaj Albumów
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${styles.cursorPointer} ${currentTab === 'artist' ? 'active' : 'bg-transparent'}`}
                    onClick={e => onChangeTab('artist')}
                >
                    Szukaj Artystów
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${styles.cursorPointer} ${currentTab === 'own-playlist' ? 'active' : 'bg-transparent'}`}
                    onClick={e => onChangeTab('own-playlist')}
                >
                    Własne Playlisty
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${styles.cursorPointer} ${currentTab === 'playlist' ? 'active' : 'bg-transparent'}`}
                    onClick={e => onChangeTab('playlist')}
                >
                    Playlisty Spotify
                </button>
            </li>
        </ul>
    )
}