import { ref, update } from "firebase/database";
import { db } from "./init";

export function fav(id, fav){
  update(ref(db, 'posts/' + id), {
    fav: fav+1
  });
}