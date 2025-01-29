import { ByUser } from "./recipe.model";

export interface UserModel {
    _id: string,
    username: string,
    password: string,
    fullname: string,
    imgUrl: string,

    following: ByUser[],
    followers: ByUser[],
    likedStoryIds: string[], // can also use mini-stories { _id, imgUrl }
    savedStoryIds: string[], // can also use mini-stories { _id, imgUrl }
}
