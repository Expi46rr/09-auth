import css from "../LayoutNotes.module.css";

export default function LayoutNotes({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <div className={css.notesWrapper}>{sidebar}</div>
      </div>

      {children}
    </div>
  );
}
