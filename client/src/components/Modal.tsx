import Button from "./Button";
import { useState } from "react";
import styled, { css } from "styled-components";

export const ModalButtonsDiv = styled.div`
  width: 300px;
  margin: auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
`;

const StyledModalCloseButton = styled(Button)`
  margin-bottom: 30px;
`;

const StyledModal = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.$isOpen &&
    css`
      display: block;
    `}
`;

const StyledModalCard = styled.div<{ $fullScreen: boolean | undefined }>`
  background-color: #424242;
  width: 80%;
  margin: 10% auto;
  padding: 40px;
  border-radius: 8px;
  &:hover {
    cursor: initial;
  }
  ${(props) =>
    props.$fullScreen &&
    css`
      height: 100%;
      margin: auto;
    `};
`;

const StyledModalContent = styled.div`
  width: 80%;
  margin: auto;
`;

type TModalProps = {
  onOpen?: () => void;
  content: React.ReactElement;
  openButtonText?: string;
  fullScreen?: boolean;
};

const OpenModalButton = styled(Button)`
  font-size: small;
`;

const Modal = ({
  onOpen,
  content,
  openButtonText,
  fullScreen,
}: TModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    if (onOpen) {
      onOpen();
    }
    setIsOpen(true);
  };
  return (
    <>
      <OpenModalButton onClick={() => handleOpen()}>
        {openButtonText || "open"}
      </OpenModalButton>
      <StyledModal
        $isOpen={isOpen}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <StyledModalCard
          $fullScreen={fullScreen}
          onClick={(e) => e.stopPropagation()}
        >
          <StyledModalContent>
            <StyledModalCloseButton onClick={() => setIsOpen(false)}>
              close
            </StyledModalCloseButton>
            {content}
          </StyledModalContent>
        </StyledModalCard>
      </StyledModal>
    </>
  );
};

export default Modal;
