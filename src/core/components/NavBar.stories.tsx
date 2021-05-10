import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NavBar } from './NavBar'
import { MemoryRouter } from 'react-router'


export default {
  title: 'Core/NavBar',
  component: NavBar,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => {
      return <MemoryRouter>
        {/* <Story /> */}
        {Story()}
      </MemoryRouter>
    }
  ]
} as Meta;

const Template: Story<Parameters<typeof NavBar>[0]> = (args) => <NavBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};



// function test(a: string, b: number) { }

// type func = typeof test
// type params = Parameters<func>
// type first = Parameters<func>[0]