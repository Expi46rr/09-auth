import { tags } from "@/constans/tags";

interface Props {
  children: React.ReactNode;
}

const NotesLayout = ({ children }: Props) => {
  return (
    <div>
      <ul>
        {tags.map((tag) => (
          <>
            <li>All notes</li>
            <li>{tag}</li>
          </>
        ))}
      </ul>
      {children}
    </div>
  );
};

export default NotesLayout;
