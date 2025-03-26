interface PostProps {
  params: {
    id: string
  }
}

export default async function Post({ params }: PostProps) {
   const { id } = await params

  return (
    <section>
      <p>id: {id}</p>
    </section>
  )
}