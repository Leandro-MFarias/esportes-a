import Link from "next/link";

export default function Home() {

  return (
    <div className="h-screen">
      <header className="border-b border-zinc-500 py-10 px-5">
        <nav className="flex justify-between">
          <h2>Nome do BLOG</h2>

          <Link href='/login'>
            <p>Login</p>
          </Link>
          <Link href='/profile'>
            <p>Meu perfil</p>
          </Link>

        </nav>

      </header>
      <div className="flex justify-center pt-10">
        <button className="bg-violet-700 px-10 py-3 rounded-2xl">Novo Post</button>
      </div>
    </div>
  )
}