import { Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { HeaderCard } from "./header-card";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

interface headerState {
  header: string;
  active: boolean;
}

export const LinksSection = () => {
  const [contents, setContents] = useState<headerState[]>([]);
  const [count, setCount] = useState(0);

  const handleAddHeader = () => {
    const newHeader = {
      header: `Header ${count}`,
      active: true,
    };
    setCount(count + 1);
    setContents((prevContents) => [...prevContents, newHeader]);
  };

  const handleAddLink = () => {
    const newLink = {
      header: `Link ${count}`,
      active: true,
    };
    setCount(count + 1);
    setContents((prevContents) => [...prevContents, newLink]);
  };


  const handleSort = (result: DropResult) => {
    if (!result.destination) return; // dropped outside the list
    const items = Array.from(contents);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setContents(items);
  };

  return (
    <div className="flex gap-8 w-full md:w-2/3 box-content px-4 h-[93vh] justify-center">
      <div className="flex flex-col w-full box-content px-4 justify-start items-center mt-72">
        <Button
          startContent={<i className="ri-add-fill !text-xl"></i>}
          color="secondary"
          radius="full"
          size="lg"
          fullWidth
          className="box-content px-0 w-full md:max-w-xl mb-8"
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
          <div className="px-0 w-full md:max-w-xl mt-8">
            <div>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col w-full box-content justify-start items-center"
                  >
                    {contents.map((item, index) => (
                      <Draggable
                        key={item.header}
                        draggableId={item.header}
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
                              header={item.header}
                              active={item.active}
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
    </div>
  );
};
