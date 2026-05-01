// To explicitly mark a function as a Server Action, indicating it only runs on
// the server. This is only necessary for functions in separate files as server
// components already implicitly run on the server without needing this directive.
// This function could be included in the Write component with needing to specify
// 'use server' but is created here in a seperate file for demonstration.
"use server";
import { AsyncDatabase } from "promised-sqlite3";

export default async function postNote(formData) {
  console.log("postNote called: ", formData);

  const from = formData.get("from_user");
  const to = formData.get("to_user");
  const note = formData.get("note");

  if (!from || !to || !note) {
    throw new Error("All fields are required");
  }

  const db = await AsyncDatabase.open("./notes.db");
  await db.run(
    "INSERT INTO notes (from_user, to_user, note) VALUES (?, ?, ?)",
    [from, to, note],
  );
}
