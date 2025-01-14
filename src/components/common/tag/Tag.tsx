/**
 * @author mingyu
 */
import React from "react";

type tagProps = {
  tagId?: number;
  tagName: string;
};

const Tag = ({ tagId, tagName }: tagProps) => {
  return (
    <div
      className={`flex cursor-pointer whitespace-nowrap rounded-3xl bg-primary-yellow/75 pl-2 pr-2 pt-1 pb-1 text-sm font-semibold text-black hover:invert-[.10]`}
    >
      #{tagName}
    </div>
  );
};

export default Tag;
