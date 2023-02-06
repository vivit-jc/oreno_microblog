import { ref, get, set, onValue } from "firebase/database";
import { db } from "./init";

// 一度だけ値を取得する
// // https://firebase.google.com/docs/database/web/read-and-write
export const getPosts = (callback) => {
  const dataRef = ref(db, "posts/" );
  console.log("getposts")

  get(dataRef).then((snapshot) => {
    console.log("dataref")
    if (snapshot.exists()) {
        console.log("exist")
      if (callback) {
        callback(snapshot.val());
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}