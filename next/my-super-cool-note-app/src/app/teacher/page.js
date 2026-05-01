import TeacherClientPage from "./clientPage";
import fetchNotes from "./fetchNotes";

// The Teacher component demonstrates combining a server component and client component.
// This server component seeds the Teacher page UI with initial data then hands
// state updates and state management off to the client component by passing data
// fetching server functionality down to the client component through props.
export default async function TeacherView() {
  const initialNotes = await fetchNotes();

  return (
    <TeacherClientPage initialNotes={initialNotes} fetchNotes={fetchNotes} />
  );
}
