import VoteDetailItem from "@/components/vote/detail/Item";
import PicketArea from "@/components/picket";
import CommentListArea from "@/components/commentList";
import { Locale } from "i18n-config";
import HydrateDetail from "./hydrateDetail";

export async function generateStaticParams() {
  return [{ detail: "1" }];
}

const VoteDetail = ({
  params,
}: {
  params: { detail: string; lng: Locale };
}) => {
  console.log(params);
  return (
    <div className={"VoteDetail"} style={{ width: "100%", height: "100%" }}>
      {/* @ts-expect-error Server Component */}
      <HydrateDetail postId={1} />
      <PicketArea />
      <CommentListArea />
    </div>
  );
};

export default VoteDetail;