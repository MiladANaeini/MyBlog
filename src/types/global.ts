import { UseQueryResult } from "react-query";
import { z } from "zod";
import {
  formSchema,
  signUpSchema,
  credentialsSchema
} from "@/constants/validationSchema";

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

export type FormValueType = z.infer<typeof formSchema>;

export type OnSubmitType = (formValues: FormValueType) => void | Promise<void>;

export type DraftCardType = {
  onSubmit: OnSubmitType;
};

export type DraftStoreType = {
  draft: DraftType | null;
  setDraft: (draftValue: DraftType | null) => void;
};

export type LoadingType = {
  loading?: boolean;
  className?: string;
};

export type SignInFormValueType = z.infer<typeof credentialsSchema>;

export type SignUpFormValueType = z.infer<typeof signUpSchema>;
