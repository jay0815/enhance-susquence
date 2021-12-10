import { type FC } from "react";
import type { PostItem, Resource } from "../fake";

interface Props {
  resource: Resource<PostItem[]>
}

const TimeLine: FC<Props> = ({ resource }) => {
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