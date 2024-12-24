import { UseQueryResult } from "react-query";
export type PostType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};
export type PostTypes = PostType[];

export type DraftType = {
  name: string;
  description: string;
};

export type BlogCardProps = {
  blogList: PostType[];
  refetch: () => Promise<UseQueryResult>;
  isLoading: boolean;
};

export type OnSubmitType = (
  formValues: Record<string, unknown>
) => void | Promise<void>;

export type DraftStore = {
  draft: DraftType | null;
  setDraft: (draftValue: DraftType | null) => void;
};

export type LoadingProps = {
  loading?: boolean;
  className?: string;
};
