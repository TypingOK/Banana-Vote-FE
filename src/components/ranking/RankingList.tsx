"use client";
import getRanking from "@/common/fetch/getRanking";
import { rankingListTypes, seasonType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../Loading";
import Pagination from "./Pagination";

export default function RankingList() {
  // const data: rankingListTypes = await getData();
  const [nowPageIndex, setNowPageIndex] = useState(0);

  const { data, isLoading, isFetching } = useQuery<rankingListTypes>({
    queryKey: ["ranking", nowPageIndex],
    queryFn: () => getRanking(nowPageIndex),
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      {data && (
        <>
          <table className="mb-8 w-full  table-auto text-[20px]">
            <thead className="m-2 truncate">
              <tr className="w-full border-b-8 border-[#E8C254] text-[29px] font-bold">
                <td className="border-1 p-2 text-left">등수</td>
                <td className="border-1 p-2 text-left">닉네임</td>
                <td className="border-1 p-2 text-left">포인트</td>
              </tr>
            </thead>
            <tbody className="m-2 text-[20px]">
              {data.ranking_list &&
                data.ranking_list.map((value, index) => {
                  return (
                    <tr key={index} className="border-b-2 text-left">
                      <td className="border-1 max-w-0 truncate p-2">
                        {value.ranking}
                      </td>
                      <td className="border-1 max-w-0 truncate p-2">
                        {value.nickname}
                      </td>
                      <td className="border-1 max-w-0 truncate p-2">
                        {value.score}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
      <Pagination
        total_page={data?.total_page}
        nowPageIndex={nowPageIndex}
        setNowPageIndex={setNowPageIndex}
      ></Pagination>
    </>
  );
}
