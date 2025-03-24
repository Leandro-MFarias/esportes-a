import { cookies } from "next/headers";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;

  const cookieStore = await cookies()


  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name}>
      <p>{id}</p>
      <p>Name: {cookie.name}</p>
      <p>value: {cookie.value}</p>
    </div>
  ))
}
