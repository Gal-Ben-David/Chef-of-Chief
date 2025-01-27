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
    comments: Array<Comment> | [],
    likedBy: Array<Like> | [],
    tags: string[],
}

export interface Comment {
    id: string,
    by: {
        _id: string,
        fullname: string,
        imgUrl: string,
    },
    txt: string,
    likedBy?: Array<Like>,
}

export interface Like {
    _id: string,
    fullname: string,
    imgUrl: string,
}

export interface Location {
    lat: number,
    lng: number,
    name: string,
}
