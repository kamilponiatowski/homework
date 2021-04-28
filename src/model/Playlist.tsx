export interface Playlist {
    id: string;
    name: string;
    public: boolean;
    description: string;
}

export interface ResponsePlaylist {
    items: Playlist[]
}