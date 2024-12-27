import { create } from "zustand";
import { DraftType, DraftStoreType } from "../../types/global";

export const useDraft = create<DraftStoreType>(set => ({
  draft: null as DraftType | null,
  setDraft: (draftValue: DraftType | null) => set(() => ({ draft: draftValue }))
}));
