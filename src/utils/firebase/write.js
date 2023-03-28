import { ref, update } from "firebase/database";
import { db } from "./init";

export function setFav(id,n) {
  update(ref(db, 'posts/' + id), {
    fav: n
  });
}