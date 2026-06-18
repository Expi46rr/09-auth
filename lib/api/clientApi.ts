import { type Note } from "../../types/note";
import { type NoteTag } from "../../types/note";
import { type User } from "../../types/user";
import { api } from "./api";
interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}
interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
export type NotesCreate = {
  title: string;
  content: string;
  tag: NoteTag;
};
interface RegisterRequest {
  email: string;
  password: string;
}
interface UpdateRequest {
  username: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag: tag,
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: NotesCreate): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (
  registerData: RegisterRequest,
): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", registerData);
  return data;
};
export const login = async (loginData: RegisterRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", loginData);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
export const checkSession = async (): Promise<User> => {
  const { data } = await api.get<User>("/auth/session");
  return data;
};
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};
export const updateMe = async (updateData: UpdateRequest): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", updateData);
  return data;
};
