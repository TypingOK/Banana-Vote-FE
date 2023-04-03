import { useQuery } from "@tanstack/react-query";

export const voteCheckFetch = async (postId: number) => {
  const res = await fetch(
    new URL(
      "http://localhost:3001/api/vote/detail/check?" +
        new URLSearchParams({
          vote_id: String(postId),
        })
    )
  );

  return res.json();
};

export const useVoteCheckQuery = ({
  queryKey,
  postId,
}: {
  queryKey: string;
  postId: number;
}) => {
  return useQuery({
    queryKey: [queryKey, postId],
    queryFn: async () => {
      const response = await voteCheckFetch(postId);
      return response.res;
    },
  });
};
