export function parseContent(content: string) {
  const urlRegex = /(https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png|\.gif|\.webp))/g;

  const parts = content.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <img
          key={index}
          src={part}
          alt="image"
          className="max-w-96 rounded-md"
        />
      );
    }
    return <p key={index}>{part}</p>;
  });
}
