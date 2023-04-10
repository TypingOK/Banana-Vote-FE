/**
 * @author mingyu
 */
"use client";
import { filterOptions } from "@/types";
import { RadioGroup, Switch } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type sortOption = {
  id: 1 | 2 | 3 | 4;
  name: string;
};

type voteSearchBarProps = {
  setKeyword: Dispatch<SetStateAction<string>>;
  filterOptions: filterOptions;
  setFilterOptions: Dispatch<SetStateAction<filterOptions>>;
};

const SORT_OPTIONS: sortOption[] = [
  {
    id: 1,
    name: "최신 순",
  },
  {
    id: 2,
    name: "참여 순",
  },
  {
    id: 3,
    name: "조회 순",
  },
  {
    id: 4,
    name: "댓글 많은 순",
  },
];

const VoteSearchBar = ({
  setKeyword,
  filterOptions,
  setFilterOptions,
}: voteSearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  /**
   * @description 입력한 keyword에 해당하는 피드를 불러옴
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyword(inputValue);
      setInputValue(inputValue);
    }
  };

  return (
    <div className="m-auto mt-4 mb-4 h-auto w-full select-none rounded-xl bg-white drop-shadow-md">
      {/* 바디 */}
      <div className="flex h-auto flex-col items-center gap-2 p-5">
        {/* 검색창 */}
        <div className="lg:text-md ml-2 flex h-10 w-full items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-500 transition hover:bg-white hover:outline hover:outline-2 hover:outline-terriary-mint focus:bg-white focus:outline focus:outline-2 focus:outline-terriary-mint md:text-sm">
          <form className="flex w-full">
            <label className="flex h-5 w-11 justify-center">
              <MagnifyingGlassIcon
                className="h-5 w-5"
                onClick={() => alert("Search")}
              />
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="검색"
              className="mr-3 h-5 bg-transparent pl-1 pr-1 leading-5 outline-none "
              style={{ width: "calc(100% - 40px)" }}
              onFocus={(e) => {
                const pa1 = e.target.parentNode as Element;
                const pa2 = pa1.parentNode as Element;
                pa2.classList.add("bg-white");
                pa2.classList.add("outline");
                pa2.classList.add("outline-2");
                pa2.classList.add("outline-terriary-mint");
              }}
              onBlur={(e) => {
                const pa1 = e.target.parentNode as Element;
                const pa2 = pa1.parentNode as Element;
                pa2.classList.remove("bg-white");
                pa2.classList.remove("outline");
                pa2.classList.remove("outline-2");
                pa2.classList.remove("outline-terriary-mint");
              }}
            />
          </form>
        </div>
        {/* 필터 */}
        <div className="flex h-24 w-full flex-col items-center justify-center gap-2 md:h-10 md:flex-row md:justify-around md:gap-0">
          {/* 종료 여부 */}
          <div className="flex h-10 w-auto items-center justify-center lg:h-full">
            <span className="mr-2 text-sm leading-9 md:text-base">
              종료 투표 포함
            </span>
            <Switch
              checked={filterOptions.isClosed}
              onChange={() =>
                setFilterOptions({
                  ...filterOptions,
                  isClosed: !filterOptions.isClosed,
                })
              }
              className={`${
                filterOptions.isClosed ? "bg-secondary-orange" : "bg-gray-500"
              }
              relative inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span
                aria-hidden="true"
                className={`${
                  filterOptions.isClosed ? "translate-x-7" : "translate-x-0"
                }
            pointer-events-none inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
          {/* 정렬 순 */}
          <RadioGroup className="flex h-10 w-auto space-x-3 lg:h-full">
            {SORT_OPTIONS.map((option: sortOption) => {
              return (
                <RadioGroup.Option
                  key={option.id}
                  value={option}
                  className={`flex h-full w-auto cursor-pointer items-center justify-center rounded-2xl border-transparent pl-2 pr-2 font-semibold shadow-md ${
                    filterOptions.sortBy === option.id
                      ? "bg-secondary-orange"
                      : "hover:bg-gray-300"
                  } `}
                  onClick={() =>
                    setFilterOptions({
                      ...filterOptions,
                      sortBy: option.id,
                    })
                  }
                >
                  <RadioGroup.Label
                    className={`text-xs text-black md:text-sm lg:text-base`}
                  >
                    {option.name}
                  </RadioGroup.Label>
                </RadioGroup.Option>
              );
            })}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default VoteSearchBar;