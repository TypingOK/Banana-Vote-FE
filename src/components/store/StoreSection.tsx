/**
 * @author mingyu
 */
"use client";
import React, { useState } from "react";
import CategoryArea from "@/components/store/CategoryArea";
import FilterArea from "@/components/store/FilterArea";
import GoodsListArea from "@/components/store/GoodsListArea";
import { STORE_CATEGORIES, STORE_FILTER_ELEMENT_LIST } from "@/constants/store";
import { useStoreGoodsQuery } from "./../../hooks/reactQuery/useStoreGoodsQuery";
import Loading from "@/components/Loading";
import PageTitle from "@/components/common/PageTitle";
import useTranslation from "@/hooks/useTranslation";

const StoreSection = () => {
  const { translation } = useTranslation();

  const [currentCategory, setCurrentCategory] = useState<number>(0); // 현재 카테고리
  const [orderBy, setOrderBy] = useState<number>(0); // 0 : 최신 순, 1 : 인기 순, 2 : 가격 순

  const { data, isLoading, isFetching, isError } = useStoreGoodsQuery({
    queryKey: "storeGoods",
  });

  return (
    <>
      {/* 타이틀 영역 */}
      <PageTitle title={translation("store.page.title")} />
      {/* 카테고리 영역 */}
      <CategoryArea
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        categories={STORE_CATEGORIES}
      />
      {/* 필터 영역 */}
      <FilterArea
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        filterElementList={STORE_FILTER_ELEMENT_LIST}
      />
      {/* 아이템 영역 */}
      {isLoading && <Loading />}
      {data && (
        <GoodsListArea
          currentCategory={currentCategory}
          orderBy={orderBy}
          goodsList={data}
        />
      )}
    </>
  );
};

export default StoreSection;
