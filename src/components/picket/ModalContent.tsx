import { picketType } from "@/types";
import Image from "next/image";
import banana from "@assets/icons/banana_svgrepo.com.svg";
import React from "react";
import PicketDropzone from "./PicketDropzone";
type picketChangeType = {
  change: boolean;
  picket: picketType;
};

const PicketAreaModalContent = ({
  pickets,
  onChangeState,
}: {
  pickets: picketType[];
  onChangeState: ({ change, picket }: picketChangeType) => void;
}) => {
  const onClick = ({ picket }: { picket: picketType }) => {
    onChangeState({ change: true, picket });
  };
  return (
    <div className={`flex h-fit w-full flex-col items-center pb-[20px]`}>
      {pickets.map((e, i) => (
        <div key={i}>
          <Image
            src={e.picket_image_url}
            width={1200}
            height={200}
            style={{
              height: "200px",
              width: "auto",
              maxWidth: "800",
              margin: "auto",
            }}
            alt={"피켓 이밎"}
          ></Image>
          <div
            className={`flex w-full max-w-5xl items-center justify-between p-3`}
          >
            <button
              className={`flex `}
              onClick={() => {
                onClick({
                  picket: {
                    picket_image_url: e.picket_image_url,
                    price: e.price,
                    position: e.position,
                  },
                });
              }}
            >
              <Image src={banana} alt={"바나나"} style={{ width: "30px" }} />
              <div className={`text-xl font-bold`}>
                {e.price} 으로 현재 피캣 바꾸기
              </div>
            </button>
            <button>🚨</button>
          </div>
        </div>
      ))}
      <div className={`my-[20px] mb-[150px] h-fit w-full`}>
        <PicketDropzone change={false} />
      </div>
    </div>
  );
};

export default PicketAreaModalContent;