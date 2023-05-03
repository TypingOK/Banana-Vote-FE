"use client";

import { getRemainDates } from "@/common/getRemainDates";
import BadgeImage from "@/components/common/BadgeImage";
import { useVoteCheckMutation } from "@/hooks/reactQuery/mutation/useVoteCheckMutation";
import { useVoteCheckQuery } from "@/hooks/reactQuery/useVoteCheckQuery";
import { useVoteDetailQuery } from "@/hooks/reactQuery/useVoteDetailQuery";
import { Key, useState } from "react";
import VoteDetailPredictionModal from "../PredictionModal";
import VoteDetailItemCard from "./ItemCard";
import { voteItemType } from "@/types";
import Image from "next/image";
import useTranslation from "@/hooks/useTranslation";
import DeclarationModal from "@/components/declaration";
import TagList from "@/components/common/tag/TagList";
import VoteDetailEndItemCard from "./endItems/EndItemCard";
import Modal from "@/components/common/modal";
import ModalHeader from "@/components/common/modal/Header";
import ModalDescription from "@/components/common/modal/Description";

type imageModalType = {
  image_url: string;
  isOpen: boolean;
};

const VoteDetailItem = ({ postId }: { postId: number }) => {
  const { data } = useVoteDetailQuery({
    queryKey: "voteDetail",
    postId: postId,
  });
  const { translation } = useTranslation();
  const { data: voteCheck } = useVoteCheckQuery({
    queryKey: "voteCheck",
    postId: postId,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 이미지 전용 모달
  const [isImageModalOpen, setIsImageModalOpen] = useState<imageModalType>({
    image_url: "",
    isOpen: false,
  });

  const [isDeclaration, setIsDeclaration] = useState<boolean>(false);
  const declarationHandler = () => {
    // 신고 모달 닫기,열기
    setIsDeclaration((prev) => {
      return !prev;
    });
  };

  const onOpen = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };
  const onClose = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  const imageModalHandler = ({
    isOpen,
    image_url,
  }: {
    isOpen: boolean;
    image_url: string;
  }) => {
    setIsImageModalOpen((prev) => {
      return {
        isOpen,
        image_url,
      };
    });
  };

  const { mutate } = useVoteCheckMutation({ queryKey: ["voteCheck", postId] });

  const [selectItem, setSelectItem] = useState<number | undefined>();

  const select = (itemId: number) => {
    if (itemId === selectItem) {
      setSelectItem((prev: number | undefined) => {
        return undefined;
      });
    } else {
      setSelectItem((prev: number | undefined) => {
        return itemId;
      });
    }
  };
  return (
    <div className="rounded-2xl bg-bg-feed dark:bg-bg-feed-dark">
      {data && isDeclaration && (
        <DeclarationModal
          title={data.vote.title}
          onClose={declarationHandler}
          type={0}
        />
      )}
      {data && isImageModalOpen.isOpen && (
        <Modal
          onClose={() => {
            imageModalHandler({ isOpen: false, image_url: "" });
          }}
          className={`relative h-[95vh] max-h-[800px] w-full max-w-[1200px] rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-bg-feed-dark dark:text-text-normal-dark`}
        >
          <ModalHeader className="absolute right-0 top-0  mb-4 flex justify-center text-xl font-extrabold leading-6 text-gray-900">
            <button
              id="picketModalCloseButton"
              className={`absolute top-1 right-3 z-10`}
              onClick={() => {
                imageModalHandler({ isOpen: false, image_url: "" });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 transition-colors duration-300 dark:text-text-normal-dark"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </ModalHeader>
          <ModalDescription className="relative flex h-full w-full items-center justify-center">
            <div className="relative flex h-[90%] w-[90%] justify-center">
              <Image
                src="https://cdn.discordapp.com/attachments/433506654009425921/1021417880207753237/unknown.png"
                alt="기본 이미지"
                fill
                style={{ objectFit: "contain" }}
              ></Image>
            </div>
          </ModalDescription>
        </Modal>
      )}
      {data && (
        <div className="mt-10 rounded-2xl border px-[5%] shadow-md dark:border-border-dark ">
          <div className="mb-5 border-b-[5px] border-gray-200">
            <div className="flex items-center py-4">
              <div className="lg:text-md mr-2 flex-1 sm:flex-[2] md:flex-[2]">
                {data.vote.is_closed ? (
                  <span className="w-full text-red-500 ">
                    {translation("vote.detail.item.end")}
                  </span>
                ) : (
                  <span className="w-full text-secondary-orange">
                    {translation("vote.detail.item.ing")}
                  </span>
                )}
              </div>
              <h2 className="flex-[9] font-bold transition-colors duration-300 dark:text-text-normal-dark lg:flex-[20] lg:text-xl">
                {data.vote.title}
              </h2>
            </div>
            <div className="mb-3 flex items-center">
              <BadgeImage
                user_id={data.writer.id}
                badge_image_url={data.writer.badge_image_url}
              />
              <div className="ml-1 text-xs transition-colors duration-300 dark:text-text-normal-dark">
                {data.writer.nickname}
              </div>
            </div>
          </div>
          <div>
            <div className="flex w-full justify-between">
              <div className="w-70 mb- flex">
                <p className="mr-3 transition-colors duration-300 dark:text-text-normal-dark">
                  {translation("vote.detail.item.period")}
                </p>
                <p className="ml-1 transition-colors duration-300 dark:text-text-normal-dark">
                  {getRemainDates({
                    startDate: data.vote.start_date,
                    endDate: data.vote.end_date,
                  })}
                  {translation("vote.detail.item.remaining")}
                </p>
              </div>
              <div className="w-30 flex justify-end">
                <p className="mr-1 transition-colors duration-300 dark:text-text-normal-dark">
                  {translation("vote.detail.item.hits")}
                </p>
                <p className="mr-1 transition-colors duration-300 dark:text-text-normal-dark">
                  {data.vote.hits}
                </p>
              </div>
            </div>
            {!data.vote.is_closed ? (
              <div className="mt-[25px] flex flex-col" id="voteItemCardLists">
                {data.vote_items.map((e: voteItemType, i: Key) => (
                  <VoteDetailItemCard
                    key={i}
                    item={e}
                    setSelectItem={select}
                    selectItem={selectItem}
                    isParti={voteCheck?.is_participation}
                    imageModalHandler={imageModalHandler}
                    isOpen={isImageModalOpen.isOpen}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-[25px] flex flex-col" id="voteItemCardLists">
                {data.vote_items.map((e: voteItemType, i: Key) => (
                  <VoteDetailEndItemCard
                    key={i}
                    item={e}
                    total_voted={data.vote.voted_number}
                    imageModalHandler={imageModalHandler}
                    isOpen={isImageModalOpen.isOpen}
                  />
                ))}
              </div>
            )}
            <div
              className={
                "ml-auto text-right text-sm  transition-colors duration-300 dark:text-text-normal-dark"
              }
            >
              {translation("vote.detail.item.image_hint")}
            </div>
            {voteCheck !== undefined && (
              <div className="mt-[25px] mb-[25px] flex w-full justify-center">
                {voteCheck.is_participation ? (
                  <button
                    onClick={onOpen}
                    className="rounded bg-secondary-orange px-4 py-2 text-black transition-colors duration-300 dark:text-text-normal-dark"
                  >
                    {translation("vote.detail.item.predict_result")}
                  </button>
                ) : (
                  <button
                    disabled={selectItem === undefined}
                    onClick={() => {
                      mutate({
                        is_participation: true,
                        vote_item_id: selectItem !== undefined ? selectItem : 0,
                        point: 0,
                      });
                    }}
                    className="mt-[25px] rounded px-4 py-2 text-black transition-colors duration-300 dark:text-text-normal-dark"
                    style={{
                      background:
                        selectItem === undefined ? "#313131" : "#FFA45B",
                    }}
                  >
                    {translation("vote.detail.item.voting")}
                  </button>
                )}
                {isOpen &&
                  voteCheck.point !== undefined &&
                  voteCheck.vote_item_id !== undefined && (
                    <VoteDetailPredictionModal
                      isOpen={isOpen}
                      onClose={onClose}
                      voteItemId={voteCheck.vote_item_id}
                      point={voteCheck.point}
                      postId={postId}
                    />
                  )}
              </div>
            )}
          </div>
          <div className="relative border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex h-full w-full items-center">
              <div className="w-full flex-wrap">
                <TagList tags={data.vote.tags} />
              </div>
              <div className="ml-auto flex w-[200px]">
                <button className="mr-4 w-[70px] rounded border bg-secondary-orange py-2 px-4 font-semibold text-black shadow-md hover:bg-primary-yellow ">
                  {translation("vote.detail.item.delete")}
                </button>
                <button
                  onClick={declarationHandler}
                  className="w-[70px] rounded border bg-red-600 py-2 px-4 font-semibold text-white shadow-md hover:bg-red-500 hover:text-white"
                >
                  {translation("vote.detail.item.declaration")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteDetailItem;
