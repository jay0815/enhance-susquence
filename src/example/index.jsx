import React from "react";
import { fetchU, fetchP } from "./fake";
import EnhanceSusquence from '../../lib/index';
import User from './components/user';
import TimeLine from './components/timeline';

function App() {
  const user = fetchU();
  const posts = fetchP();
  return (
    <EnhanceSusquence
      loading={<h1>Loading user...</h1>}
      error={<h1>Opps ...</h1>}
    >
      <User resource={user} />
      <EnhanceSusquence
        loading={<h1>Loading posts...</h1>}
        error={<h1>Opps 2 ...</h1>}
      >
        <TimeLine resource={posts} />
      </EnhanceSusquence>
    </EnhanceSusquence>
  );
}

export default App;
