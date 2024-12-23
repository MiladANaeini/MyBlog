import { create } from 'zustand'
import {DraftType} from '../../types/global'



export const useDraft = create((set) => ({

    draft: null as DraftType | null,
    setDraft: (draftValue: DraftType) => set(() => ({ draft: draftValue })) ,
    }))