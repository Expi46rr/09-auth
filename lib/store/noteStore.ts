import { create } from "zustand";

import { persist } from "zustand/middleware";
import { NotesCreate } from "../api";

type NoteDraftStore = {
  draft: NotesCreate;
  setDraft: (note: NotesCreate) => void;
  clearDraft: () => void;
};

const initialDraft: NotesCreate = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  // 2. Обгортаємо функцію створення стора
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      // Ключ у localStorage
      name: "note-draft",
      // Зберігаємо лише властивість draft
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
