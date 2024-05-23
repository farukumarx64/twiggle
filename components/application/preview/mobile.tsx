import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { PreviewContent } from "./content";
import { HeaderCardProps } from "../links/links-card";
import { ProfileDataProps } from "@/pages/admin";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  content: HeaderCardProps[];
  profileData: ProfileDataProps;
}

export const PreviewMobile: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  content,
  profileData,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <PreviewContent
                content={content}
                profileData={profileData}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
