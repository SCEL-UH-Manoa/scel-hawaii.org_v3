import { readFileSync } from "node:fs";

// Everyone with a role, sorted by name. Edit _data/members.json to add or change people.
export default function () {
  const members = JSON.parse(readFileSync(new URL("./members.json", import.meta.url)));
  return members
    .filter((m) => m.role)
    .sort((a, b) => a.last_name.localeCompare(b.last_name) || a.first_name.localeCompare(b.first_name));
}
