interface Props {
  params: Promise<{ filters: string }>;
}

const NotesFilterPage = async ({ params }: Props) => {
  const filters = await params;
  console.log("filters", filters);

  return <div>FilterPage</div>;
};

export default NotesFilterPage;
