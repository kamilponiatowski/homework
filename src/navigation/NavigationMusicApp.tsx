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
                    className={`nav-link ${styles.cursorPointer} ${currentTab === 'albums' ? 'active' : 'bg-transparent'}`}
                    onClick={e => onChangeTab('albums')}
                >
                    Szukaj Albumów
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${styles.cursorPointer} ${currentTab === 'artists' ? 'active' : 'bg-transparent'}`}
                    onClick={e => onChangeTab('artists')}
                >
                    Szukaj Artystów
                </button>
            </li>
            <li className="nav-item">
                <button
                    className={`nav-link ${styles.cursorPointer} ${currentTab === 'playlists' ? 'active' : 'bg-transparent'}`}
                    onClick={e => onChangeTab('playlists')}
                >
                    Playlisty
                </button>
            </li>
        </ul>
    )
}
