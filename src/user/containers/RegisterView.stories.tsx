
import { Story, Meta } from '@storybook/react';
import { RegisterView } from './RegisterView';


export default {
    title: 'User/Registration',
    component: RegisterView,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },

}


const Template: Story<Parameters<typeof RegisterView>[0]> = (args) => <RegisterView {...args} />;

export const Primary = Template.bind({});
Primary.args = {}