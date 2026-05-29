"use client";
import css from "./NoteDetails.client.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleNote } from "@/lib/api";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.tag}>{data?.tag}</p>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
    </div>
  );
}
