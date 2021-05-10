import { Meta, Story } from "@storybook/react";
import { PlaylistList } from "./PlaylistList";

export default {
    title: "Playlists/List",
    component: PlaylistList,
    decorators: [
        Story => <div style={{ maxWidth: 500, margin: '0 auto', border: '1px solid #ddd', padding: '10px' }} >{Story()}</div>
    ],
} as Meta;

type ListProps = Parameters<typeof PlaylistList>[0];

const Template: Story<ListProps> = (args) => <PlaylistList {...args} />;

export const WithSelectedId = Template.bind({})

WithSelectedId.args = {
    playlists: [{
        id: '123',
        name: 'Playlista Prywatna 😇',
        public: false,
        description: 'no i co ja dzis polubie?..🤔'
    },
    {
        id: '234',
        name: 'Playlista Prywatna 😇',
        public: false,
        description: 'no i co ja dzis polubie?..🤔'
    }],
    selectedId: '234'
}

export const Default = Template.bind({})

Default.args = {
    playlists: [{
        id: '123',
        name: 'Playlista Prywatna 😇',
        public: false,
        description: 'no i co ja dzis polubie?..🤔'
    },
    {
        id: '234',
        name: 'Playlista Prywatna 😇',
        public: false,
        description: 'no i co ja dzis polubie?..🤔'
    }],
    selectedId: ''
}



// import { Meta, Story } from "@storybook/react";
// import { Playlist } from "../../model/Playlist";
// import { PlaylistList } from "./PlaylistList";


// export default {
//     title: 'Playlists2/List',
//     component: PlaylistList,
//     // argTypes: { onEdit: { action: 'clicked' } }
//     decorators: [
//         Story => <div style={{ maxWidth: 500, margin: '0 auto' }} ><Story /></div>
//     ]
// } as Meta

// interface Props {
//     playlists: Playlist[]
//     selectedId?: string
//     onSelected(id: string): void
//     onRemove(id: Playlist['id']): void
// }

// type ButtonProps = Parameters<typeof PlaylistList>[0]

// const Template: Story<ButtonProps> = (args) => <PlaylistList {...args} />

// export const Primary = Template.bind({})

// Primary.args = {
//     playlist: {
//         id: '123',
//         name: 'Playlista Prywatna 😇',
//         public: false,
//         description: 'no i co ja dzis polubie?..🤔'
//     },
// }
// export const Public = Template.bind({})

// Public.args = {
//     playlist: {
//         id: '123',
//         name: 'Playlista Publiczna 😇',
//         public: true,
//         description: 'no i co ja dzis polubie?..🤔'
//     },
// }