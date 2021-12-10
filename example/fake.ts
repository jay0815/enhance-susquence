export const fetchProfileData = () => {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
const wrapPromise = <T extends any>(promise: Promise<T>) => {
  let status = "pending";
  let result: T | Error;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  ).catch((e) => {
    status = "error";
    result = e;
  });
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

export type Resource<T> = {
    read(): T | Error | undefined;
}

export interface User {
  name: string;
};

const fetchUser = () => {
  return new Promise<User>((resolve, reject) => {
    const random = Math.floor(Math.random() * 10);
    setTimeout(() => {
      random >= 5 ? resolve({
        name: "Ringo Starr"
      }) : reject(new Error("error"));
    }, 3000);
  });
}

export const fetchU = () => {
  try {
    return wrapPromise(fetchUser())
  } catch (e) {
    return e
  }
};

export interface PostItem {
  id: number;
  text: string;
};

const posts: PostItem[] = [
  {
    id: 0,
    text: "I get by with a little help from my friends"
  },
  {
    id: 1,
    text: "I'd like to be under the sea in an octupus's garden"
  },
  {
    id: 2,
    text: "You got that sand all over your feet"
  }
]

const fetchPosts = () => {
  return new Promise<PostItem[]>((resolve, reject) => {
    const random = Math.floor(Math.random() * 10);
    setTimeout(() => {
      random >= 5 ? resolve(posts) : reject(new Error("error"));
    }, 1100);
  });
}

export const fetchP = () => wrapPromise(fetchPosts());