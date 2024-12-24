import { create } from "zustand";
import { DraftType, DraftStore } from "../../types/global";

export const useDraft = create<DraftStore>(set => ({
  draft: null as DraftType | null,
  setDraft: (draftValue: DraftType | null) => set(() => ({ draft: draftValue }))
}));
