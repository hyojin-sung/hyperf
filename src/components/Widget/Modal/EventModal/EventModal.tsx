import { ReadMoreContainer } from "@/components/UI/Text/ReadMoreContainer";
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { PictureGrid } from "./PictureGrid";
import { Post } from "@/hooks/usePosts";
interface EventModalProps {
  post: Post;
  modalProps?: Omit<ModalProps, "children">;
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  post,
  isOpen,
  modalProps,
  onClose,
}) => {
  const isPictureExists = post.picture?.length && post.picture.length > 0;
  const [selectedPictureIndex, setSelectedPictureIndex] = useState<
    number | null
  >(isPictureExists ? 0 : null);

  const selectedPicture = useMemo(() => {
    if (selectedPictureIndex === null) return null;
    if (!post.picture) return null;
    return post?.picture[selectedPictureIndex];
  }, [selectedPictureIndex, post.picture]);

  const isCurrentPicture = useCallback(
    (index: number) => {
      return selectedPictureIndex === index;
    },
    [selectedPictureIndex],
  );

  return (
    <Modal
      {...modalProps}
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(modalProps?.className)}
      classNames={{
        base: "rounded-none bg-black max-w-[1460px] text-white px-5 pt-[112px]",
        closeButton: "text-white text-[28px] right-[80px] top-[50px]",
        ...modalProps?.classNames,
      }}
      scrollBehavior={modalProps?.scrollBehavior ?? "inside"}
    >
      <ModalContent>
        <ModalHeader className="block pb-0 px-[130px]">
          <div className="flex flex-col gap-5">
            <div className="text-white text-[40px] font-normal font-['SUIT'] leading-[48px]">
              {post.title}
            </div>
            <div className="text-white text-2xl font-normal font-['SUIT'] leading-[28.80px]">
              {post.date}
            </div>
          </div>
          <Divider className="mt-8 bg-white" />
        </ModalHeader>
        <ModalBody className="pb-[150px] pt-7 px-[130px]">
          <div className="flex flex-col gap-7">
            <div className="flex gap-10 w-full">
              <div className="flex-1">
                <ReadMoreContainer
                  className="max-h-[470px]"
                  MoreButton={({ onClick, children }) => (
                    <div className="w-full flex justify-end">
                      <button
                        className="text-right text-[#c3c3c3] text-base font-light font-['SUIT'] leading-snug cursor-pointer"
                        onClick={onClick}
                      >
                        {children}
                      </button>
                    </div>
                  )}
                >
                  <div className="text-justify text-white text-2xl font-light font-['SUIT'] leading-[33.60px] break-keep">
                    {post.content}
                  </div>
                </ReadMoreContainer>
              </div>
              {isPictureExists && (
                <>
                  <Divider
                    className="bg-white h-auto flex-none"
                    orientation="vertical"
                  />
                  <div className="flex-1 w-1/2">
                    {post.picture && (
                      <PictureGrid
                        isCurrentPicture={isCurrentPicture}
                        picture={post.picture}
                        setSelectedPictureIndex={setSelectedPictureIndex}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
            {selectedPicture && (
              <div className="aspect-[1160/740] overflow-hidden w-full">
                <img
                  src={selectedPicture.src}
                  alt={selectedPicture.alt}
                  className="object-center object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
