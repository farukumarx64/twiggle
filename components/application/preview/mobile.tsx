import {
  Modal,
  ModalContent, ModalBody
} from "@nextui-org/react";
import { PreviewContent } from "./content";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  userID: string;
}

export const PreviewMobile: React.FC<Props> = ({ isOpen, onOpenChange, userID }) => {
  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <PreviewContent userID={userID} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
  );
};
