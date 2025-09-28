import { getUsers } from "../lib/api";

export default async function ProfilePage() {
  const users = await getUsers();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Utilisateurs</h1>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}
