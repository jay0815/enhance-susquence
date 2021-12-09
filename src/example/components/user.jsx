function User({ resource }) {
  const user = resource.read();
  return <h1>{user.name}</h1>;
}

export default User;
