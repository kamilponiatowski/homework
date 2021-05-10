import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MyInput } from './MyInput';
import { MemoryRouter } from 'react-router-dom';
import { DefaultTheme, ThemeProvider } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: {
      color: string;
      background: string
      border?: string
    }
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
  title: 'Core/MyInput',
  component: MyInput,
  decorators: [
    (Story) => {
      return <MemoryRouter>
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

const Template: Story<Parameters<typeof MyInput>[0]> = (args) => <MyInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: "https://github.com/styled-components/styled-components",
  target: "_blank",
  rel: "noopener",
  primary: true,
};

export const CustomForCompanyInput = Template.bind({});
Default.args = {
  href: "https://github.com/styled-components/styled-components",
  target: "_blank",
  rel: "noopener",
  primary: false,
};

export const Password = Template.bind({});
Password.args = {
  href: "https://github.com/styled-components/styled-components",
  type: 'password',
  target: "_blank",
  primary: true,
  required: false,
};

export const PasswordRequired = Template.bind({});
PasswordRequired.args = {
  href: "https://github.com/styled-components/styled-components",
  type: 'password',
  target: "_blank",
  primary: true,
  required: true,
};

