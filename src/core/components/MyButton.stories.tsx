import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MyButton } from './MyButton';
import { MemoryRouter, NavLink } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: {
      color: string;
      background: string,
      border?: string,
    },
    company: {
      color: string
      background: string
      border: string
    }
  }
}

const theme: DefaultTheme = {
  primary: {
    color: 'grey',
    background: '#eee',
    border: '#BADA55',
  },
  company: {
    color: 'rebeccapurple',
    background: '#ecc05f',
    border: 'rebeccapurple',
  }
}

export default {
  title: 'Core/MyButton',
  component: MyButton,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => {
      return <MemoryRouter> {/* <Story /> */}
        {Story()}
      </MemoryRouter>
    },
    (Story) => {
      return <ThemeProvider theme={theme}>
        {Story()}
      </ThemeProvider>
    }
  ]
} as Meta;

const Template: Story<Parameters<typeof MyButton>[0]> = (args) => <MyButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  href: "https://github.com/styled-components/styled-components",
  target: "_blank",
  rel: "noopener",
  primary: true,
  children: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  href: "https://github.com/styled-components/styled-components",
  target: "_blank",
  rel: "noopener",
  // primary: true,
  children: 'Secondary',
};
export const AsButton = Template.bind({});
AsButton.args = {
  href: "https://github.com/styled-components/styled-components",
  target: "_blank",
  rel: "noopener",
  // primary: true,
  children: 'Secondary',
};

export const AsLink = Template.bind({});
AsLink.args = {
  to: "styled-components",
  // primary: true,
  as: NavLink,
  children: 'Nav Link',
};

export const Nested = Template.bind({});
Nested.args = {
  to: "styled-components",
  // primary: true,
  as: 'a',
  children: <div>
    <div className="placki">
      Nested Link
    </div>
  </div>,
};
