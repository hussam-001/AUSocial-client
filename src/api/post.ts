import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import qs from "qs";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import {
  InfiniteScrollCustomEvent,
  RefresherEventDetail,
  useIonAlert,
} from "@/overrides/ionic/react";
import { useHistory } from "@/overrides/react-router";
import { authInstance } from "@/config/axios";

export const useGetPosts = () => {
  const queryClient = useQueryClient();
  const query = useInfiniteQuery({
    initialPageParam: 1,
    meta: {
      page: 1,
    },
    queryKey: ["me", "posts"],
    queryFn: async ({ pageParam }) => {
      const search = qs.stringify({
        pagination: {
          page: pageParam,
          pageSize: 10,
        },
      });
      const res = await authInstance.get(`/posts?${search}`);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage?.pagination ?? {};
      const nextPage = page < pageCount ? page + 1 : undefined;
      return nextPage;
    },
  });

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await queryClient.resetQueries({
      queryKey: ["me", "posts"],
    });
    event.detail.complete();
  };

  const handleInfiniteScroll = async (event: InfiniteScrollCustomEvent) => {
    await query.fetchNextPage();
    event.target.complete();
  };
  const posts = useMemo(() => {
    return (
      query?.data?.pages?.flatMap((page) => {
        page.results.forEach((post: any) => {
          queryClient.setQueryData(["me", "posts", post.id], post);
        });
        return page.results;
      }) ?? []
    );
  }, [query.data]);
  return {
    ...query,
    posts,
    handleRefresh,
    handleInfiniteScroll,
  };
};

export const useGetPost = ({ id }: any) => {
  const postId = Number(id);
  const query = useQuery({
    queryKey: ["me", "posts", postId],
    queryFn: async () => {
      const res = await authInstance.get(`/posts/${postId}`);
      return res.data;
    },
    enabled: !!postId,
  });

  return query;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const mutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data) => {
      const res = await authInstance.post("/posts", data);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.resetQueries({
        queryKey: ["me", "posts"],
      });
      history.push({
        closeModals: true,
      });
    },
  });
  return mutation;
};

export const useDeletePost = () => {
  const { t } = useTranslation();
  const [presentAlert] = useIonAlert();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (id) => {
      const res = await authInstance.delete(`/posts/${id}`);
      return res.data;
    },
    onSuccess: async () => {
      queryClient.resetQueries({
        queryKey: ["me", "posts"],
      });
    },
  });
  return {
    ...mutation,
    alertMutate: (data: any) => {
      presentAlert({
        header: t("COMMON.ARE_YOU_SURE"),
        htmlAttributes: {
          style: { "--width": "100%" },
        },
        buttons: [
          {
            text: t("COMMON.NO"),
            role: "cancel",
          },
          {
            text: t("COMMON.YES"),
            role: "confirm",
            handler: () => {
              return mutation.mutate(data);
            },
          },
        ],
      });
    },
  };
};

export const useToggleReactPost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["reactPost"],
    mutationFn: async (data) => {
      const res = await authInstance.post("/reactions", data);
      return res.data;
    },
    onSuccess: async (newPostData: any) => {
      await queryClient.setQueryData(
        ["me", "posts", newPostData?.id],
        (oldData: any) => {
          if (!oldData) return oldData;
          oldData.reactions = newPostData.reactions;
          return oldData;
        },
      );
    },
    onMutate: () => {},
  });
  return mutation;
};

export const useComment = ({ methods }: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["commentOnPost"],
    mutationFn: async (data) => {
      const res = await authInstance.post("/comments", data);
      return res.data;
    },
    onSuccess: async (newPostData: any) => {
      await queryClient.setQueryData(
        ["me", "posts", newPostData?.id],
        (oldData: any) => {
          oldData.comments = newPostData.comments;
          return oldData;
        },
      );
      methods.reset();
    },
  });
  return mutation;
};
