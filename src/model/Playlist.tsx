export interface Playlist {
    id: string;
    name: string;
    public: boolean;
    description: string;
}

export interface ResponsePlaylists {
    items: Playlist[]
}