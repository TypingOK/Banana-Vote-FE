import { predictionType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const postVoteCheck = async ({
  isParticipation,
  voteItemId,
  point,
}: predictionType) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOSTNAME + "/api/vote/detail/check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isParticipation, voteItemId, point }),
    }
  );
  return res;
};

export const useVoteCheckMutation = ({
  queryKey,
}: {
  queryKey: (string | number)[];
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postVoteCheck,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
