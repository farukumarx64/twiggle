import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { HeaderCard, HeaderCardProps } from "./links-card";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addUserHeader, addUserLink } from "@/utils/state/actions/userActions";
import { RootState } from "@/utils/state/reducers/reducers";
import { createClient } from "@/utils/supabase/components";
import { PreviewMobile } from "../preview/mobile";
import { ProfileDataProps } from "@/pages/admin";

interface LinksProps {
  userID: string;
  content: HeaderCardProps[];
  setContentState: React.Dispatch<React.SetStateAction<HeaderCardProps[]>>;
  profileData: ProfileDataProps;
}

export const LinksSection: React.FC<LinksProps> = ({
  userID,
  content,
  setContentState,
  profileData,
}) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector((state: RootState) => state.user);
  const supabase = createClient();

  const handleAddHeader = () => {
    const id = v4();
    const newHeader = {
      header: "",
      id: id,
      active: false,
      link: false,
    };
    const newIndex = content.length; // Index of the newly added header
    setContentState((prevContents) => [...prevContents, newHeader]);
    dispatch(addUserHeader([...user.header, newHeader])); // Dispatch action to add header
    uploadHeader(id, newIndex, false);
  };

  const uploadHeader = async (id: string, index: number, isLink: boolean) => {
    const { error } = await supabase.from("headers").insert({
      header_id: id,
      user_id: userID,
      content: "",
      position: index,
      isLink: isLink,
    });
    if (error) {
      console.error("Error uploading header", error);
    } else {
      console.log("Header uploaded successfully");
    }
  };

  const deleteHeader = async (id: string) => {
    const { error } = await supabase
      .from("headers")
      .delete()
      .eq("header_id", id);
    if (error) {
      console.error("Error deleting header", error);
    } else {
      console.log("Header deleted successfully");
    }
  };

  const handleAddLink = () => {
    const id = v4();
    const newLink = {
      header: "",
      id: id,
      active: false,
      link: true,
    };
    const newIndex = content.length; // Index of the newly added header
    setContentState((prevContents) => [...prevContents, newLink]);
    dispatch(addUserLink([...user.header, newLink])); // Dispatch action to add link
    uploadHeader(id, newIndex, true);
  };

  const handleSort = (result: DropResult) => {
    if (!result.destination) return; // dropped outside the list
    const items = Array.from(content);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setContentState(items);

    // Update position in state or send to backend
    const updatedPositions = items.map((item, index) => ({
      header_id: item.id,
      position: index,
    }));

    // Example of sending positions to backend
    sendPositionsToBackend(updatedPositions);
  };

  const sendPositionsToBackend = async (
    positions: { header_id: string; position: number }[]
  ) => {
    try {
      const { error } = await supabase.from("headers").upsert(positions);
      if (error) {
        console.error("Error updating positions:", error);
      } else {
        console.log("Positions updated successfully");
      }
    } catch (error) {
      console.error("Error updating positions:", error);
    }
  };

  const handleDelete = (id: string) => {
    setContentState((prevContents) =>
      prevContents.filter((item) => item.id !== id)
    );
    deleteHeader(id);
  };

  const handleHeaderCardStateChange = (updatedState: HeaderCardProps) => {
    setContentState((prevContents) =>
      prevContents.map((item) =>
        item.id === updatedState.id ? { ...item, ...updatedState } : item
      )
    );
  };

  return (
    <div className="flex gap-8 w-full md:w-2/3 box-content px-4 h-[93vh] justify-center">
      <div className="flex flex-col w-full box-content px-4 justify-start items-center mt-20">
        <Button
          startContent={<i className="ri-add-fill !text-xl"></i>}
          color="secondary"
          radius="full"
          size="lg"
          fullWidth
          className=" px-4 py-6 w-full md:max-w-xl mb-8"
          onPress={handleAddLink}
        >
          Add Link
        </Button>
        <div className="px-0 w-full md:max-w-xl">
          <Button
            startContent={<i className="ri-ai-generate !text-xl"></i>}
            size="sm"
            radius="full"
            variant="bordered"
            onPress={handleAddHeader}
            className="!w-auto px-4 py-1 box-content text-sm border-1"
          >
            Add header
          </Button>
        </div>
        <DragDropContext onDragEnd={handleSort}>
          <div className="px-0 w-full md:max-w-xl mt-8 overflow-y-scroll h-[60vh] md:h-[48vh] flex flex-col gap-3">
            <div>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col w-full box-content justify-start items-center"
                  >
                    {content.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-4 box-content px-0 w-full md:max-w-xl"
                          >
                            <HeaderCard
                              state={item}
                              setState={handleHeaderCardStateChange}
                              onDelete={() => handleDelete(item.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
      <div className="hidden md:inline">
        <Divider orientation="vertical" />
      </div>
      <div className="fixed bottom-12 md:hidden">
        <Button
          radius="full"
          color="secondary"
          className="p-6"
          variant="shadow"
          startContent={<i className="ri-eye-line"></i>}
          onPress={onOpen}
        >
          <span className="font-bold">Preview</span>
        </Button>
        <PreviewMobile
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          content={content}
          profileData={profileData}
        />
      </div>
    </div>
  );
};
