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
const wrapPromise = (promise) => {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
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
// interface User {
//   name: string;
// };

const fetchUser = () => {
  console.log("fetch user...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetched user");
      resolve({
        name: "Ringo Starr"
      });
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

// interface PostItem {
//   id: number;
//   text: string;
// };

const fetchPosts = () => {
  console.log("fetch posts...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetched posts");
      reject([
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
      ]);
    }, 1100);
  });
}

export const fetchP = () => wrapPromise(fetchPosts());

const fetchInfo = () => {
  console.log("fetch user...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetched user");
      reject({
        age: 18
      });
    }, 3000);
  });
}

export const fetchI = () => wrapPromise(fetchInfo());
