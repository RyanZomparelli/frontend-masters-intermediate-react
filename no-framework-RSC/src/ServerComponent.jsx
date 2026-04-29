import { AsyncDatabase, asyncDatabase } from "promised-sqlite3";
import path from "node:path";

// This component fetches data from the db and renders it in the jsx all within
// the component.

// There is no auth in this app so this page assumes that you are logged in as user 1.
export default async function MyNotes() {
  console.log("Rendering MyNotes server component");

  async function fetchNotes() {
    console.log("running server function fetch notes.");
    // Creates an absolute path
    const dbPath = path.resolve(__dirname, "../notes.db");
    // Uses a DB file, not a remote connection so here we are opening the file.
    const db = await AsyncDatabase.open(dbPath);
    const from = await db.all(
      "SELECT n.id as id, n.note as note, f.name as from_user, t.name as to_user FROM notes n JOIN users f ON f.id = n.from_user JOIN users t ON t.id = n.to_user WHERE from_user = ?",
      ["1"],
    );
    // Everything from user 1.
    return { from };
  }

  const notes = await fetchNotes();

  return (
    <fieldset>
      <legend>Server Component</legend>
      <div>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {notes.from.map(({ id, note, from_user, to_user }) => (
              <tr key={id}>
                <td>{from_user}</td>
                <td>{to_user}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
}
