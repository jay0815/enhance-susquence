function TimeLine({ resource }) {
  const posts = resource.read();
  return (
    <ul>
      {
      Array.isArray(posts) &&
      posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export default TimeLine;