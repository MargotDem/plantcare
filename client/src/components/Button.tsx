import styled, { css } from "styled-components";

const Button = styled.button<{ $primary?: boolean }>`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  ${(props) =>
    props.$primary &&
    css`
      background: blue;
    `};
`;

export default Button;
