
type Post = {
    text: string,
    timestamp: number,
    embed: boolean,
    r18: boolean,
    tags: string[],
    fav: number
};

type Fav = {
    id: number,
    fav: number
}

declare module '@/utils/firebase/read';
declare module '@/utils/firebase/write';