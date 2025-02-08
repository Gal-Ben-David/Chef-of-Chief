export interface RecipeModel {
    _id: string,
    txt: string,
    imgUrl: string,
    by: {
        _id: string,
        fullname: string,
        imgUrl: string,
    },
    loc?: Location,
    comments: Comment[] | [],
    likedBy: ByUser[] | [],
    tags: string[],
    createdAt: number
}

export interface Comment {
    id: string,
    by: ByUser,
    txt: string,
    likedBy?: Array<ByUser>,
}

export interface ByUser {
    _id: string,
    fullname: string,
    imgUrl: string,
}

export interface Location {
    lat: number,
    lng: number,
    name: string,
}

export interface MiniRecipe {
    _id: string,
    imgUrl: string,
}
