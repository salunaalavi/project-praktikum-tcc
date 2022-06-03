const db = require("../db");
const db2 = require("../db2.js");

(async () => {
  try {
    await db("users").insert({ name: "John Doe" });
    await db("users").insert({ name: "Jane Doe" });
    await db2("posts").insert({
      title: "Post 1",
      body: "This is the body of post 1",
    });
    await db2("posts").insert({
      title: "Post 2",
      body: "This is the body of post 2",
    });
    console.log("Added dummy users!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
