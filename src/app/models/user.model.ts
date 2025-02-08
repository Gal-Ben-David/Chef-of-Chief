import { ByUser } from "./recipe.model";

export interface UserModel {
    _id: string,
    username: string,
    password: string,
    fullname: string,
    imgUrl: string,
    bio: string

    following: ByUser[],
    followers: ByUser[],
    likedRecipeIds: string[], // can also use mini-stories { _id, imgUrl }
    savedRecipeIds: string[], // can also use mini-stories { _id, imgUrl }
}
