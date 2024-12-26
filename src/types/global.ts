import { UseQueryResult } from "react-query";
import { z } from "zod";
import { formSchema } from "@/constants/formSchema";

export type PostType = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
};
export type PostTypes = PostType[];

export type DraftType = {
  name: string;
  description: string;
};

export type BlogCardType = {
  item: PostType;
  refetch: () => Promise<UseQueryResult>;
};

export type OnSubmitType = (formValues: FormValues) => void | Promise<void>;

export type DraftCardType = {
  onSubmit: OnSubmitType;
};

export type DraftStore = {
  draft: DraftType | null;
  setDraft: (draftValue: DraftType | null) => void;
};

export type LoadingProps = {
  loading?: boolean;
  className?: string;
};

export type FormValues = z.infer<typeof formSchema>;
