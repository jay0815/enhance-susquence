import { type FC } from "react";
import { type User, type Resource } from "../fake";

interface Props {
  resource: Resource<User>
}

const UserInfo: FC<Props> = ({ resource }) => {
  const user = resource.read();
  return <h1>{user?.name}</h1>;
}

export default UserInfo;
