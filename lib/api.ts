import axios from "axios";
import { type Note } from "../types/note";

interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
}
interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
interface CreateNewNote {
  title: string;
  content: string;
  tag: string;
}
const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params,
  });
  console.log(data);

  return data;
};
export const createNote = async (note: CreateNewNote): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
export const getSingleNote = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};
