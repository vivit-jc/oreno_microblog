import { ref, get } from "firebase/database";
import { db } from "./init";

// 一度だけ値を取得する
// // https://firebase.google.com/docs/database/web/read-and-write
export const getPosts = (callback) => {
  const dataRef = ref(db, "posts/" );

  get(dataRef).then((snapshot) => {
    if (snapshot.exists()) {
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