import styled, { css } from 'styled-components'

interface Props {
  primary: boolean
  required: boolean
}

export const MyInput = styled.input<Props>`
  background-color: ${props => props.theme[!props.primary ? 'primary' : 'company']!.background};
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
  color: grey;
  background: #eee;

  &:focus{
    outline:none;
    color: black;
    border: 1px solid #BADA55;
    background: white;
  }

  &:required {
    border-bottom: 2px solid orange;
  }

  ${props => props.primary && css`
  &:focus{
    border: 2px solid ${props.theme.primary.border};
    color: ${props.theme.primary.color};
  }
  `}
  ${props => !props.primary && css`
  &:focus{
    border: 2px solid ${props.theme.company.border};
    color: ${props.theme.company.color};
  }
  `}
`
