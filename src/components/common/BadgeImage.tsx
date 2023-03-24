/**
 * @author mingyu
 * @description 뱃지 이미지
 */
import React from "react";
import Image from "next/image";
import defaultProfile from "@/assets/images/default_profile.png";

type BadgeProps = {
  badge_url: string | undefined;
  nickname: string;
  isWriter?: boolean;
};

const BadgeImage = ({ badge_url, nickname, isWriter }: BadgeProps) => {
  return (
    <>
      <Image
        className="w-10 h-10 rounded-full"
        src={badge_url ? badge_url : defaultProfile}
        alt="avatar"
      />
    </>
  );
};

export default BadgeImage;
