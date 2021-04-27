import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Playlist } from "../../model/Playlist";
import { PlaylistsTDD } from "./PlaylistsTDD";

describe('PlaylistsTDD', () => {

    const setup = (showPlaylists: boolean = true) => {
        const playlists: Playlist[] = [
            {
                id: '1',
                name: "Fullmetal Alchemist",
                description: 'Fullmetal Alchemist is a Japanese manga series written and illustrated by Hiromu Arakawa.',
                public: true,
            },
            {
                id: '2',
                name: "Boku no Hero Academia",
                description: 'My Hero Academia is a Japanese superhero manga series written and illustrated by Kōhei Horikoshi. ',
                public: true,
            },
            {
                id: '3',
                name: "Elfen Lied",
                description: 'Elfen Lied is a Japanese manga series written and illustrated by Lynn Okamoto.',
                public: true,
            }
        ];

        const deleteSpy = jest.fn()

        const { rerender, container } = render(<PlaylistsTDD playlistsData={showPlaylists ? playlists : []} />)
        return { deleteSpy, rerender, container, playlists }
    }

    test('shows list of no playlists', () => {
        setup(false)
        const listPlaylists = screen.queryByRole('list', { name: "list of your current playlists" })
        expect(listPlaylists).toBe(null)
    })

    test('shows list of mock playlists', () => {
        const { playlists } = setup()
        const itemOfPlaylists = screen.queryAllByRole('listitem', { name: "playlist item" })
        expect(itemOfPlaylists).toHaveLength(playlists.length)
    })

    test('selecting playlistlist from list shows details', () => {
        const { container } = setup()
        const firstItemFromPlaylists = screen.getAllByRole('listitem', { name: "playlist item" })[0]
        expect(firstItemFromPlaylists.classList.contains('active')).toBe(false)
        userEvent.click(firstItemFromPlaylists)
        expect(firstItemFromPlaylists.classList.contains('active')).toBe(true)
        const namePlaylistFromDetails = screen.queryByRole('definition', { name: "Playlist Name" })
        expect(namePlaylistFromDetails).toHaveTextContent(`Fullmetal Alchemist`)
        // const nameForFirstItemFromPlaylists = firstItemFromPlaylists.children[0];
        // expect(namePlaylistFromDetails).toHaveTextContent(`${nameForFirstItemFromPlaylists.innerText}`)
    })

    test.skip('clicking edit in details shitches to form', () => {

    })

    /* 

    
    */
})
