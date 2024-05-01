import Button from "./Button";
import { useState } from "react";
import styled, { css } from "styled-components";

const StyledModal = styled.div<{ isOpen: boolean }>`
  display: none;
  backgroundcolor: green;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const StyledModalContent = styled.div`
  background-color: green;
  width: 80%;
  margin: 15% auto;
  padding: 40px;
  border-radius: 8px;
  &:hover {
    cursor: initial;
  }
`;

type TModalProps = {
  onOpen?: any;
  content: any; // TODO type this
  openButtonText?: string;
};

const Modal = ({ onOpen, content, openButtonText }: TModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    if (onOpen) {
      onOpen();
    }
    setIsOpen(true);
  };
  return (
    <>
      <Button onClick={() => handleOpen()}>{openButtonText || "open"}</Button>
      <StyledModal
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <StyledModalContent onClick={(e) => e.stopPropagation()}>
          <Button onClick={() => setIsOpen(false)}>close</Button>
          {content}
        </StyledModalContent>
      </StyledModal>
    </>
  );
};

export default Modal;
