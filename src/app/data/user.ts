import { UserModel } from "../models/user.model";

export const user: UserModel = {
    _id: 'u101',
    username: 'Muko',
    password: 'mukmuk',
    fullname: 'Muki Muka',
    imgUrl: '/img/user/gal.png',

    following: [
        {
            _id: 'u106',
            fullname: 'Dob',
            imgUrl: '/img/user/user-default.png',
        },
    ],
    followers: [
        {
            _id: 'u105',
            fullname: 'Bob',
            imgUrl: '/img/user/user-default.png',
        },
    ],
    likedStoryIds: ['s105', 's122', 's173'], // can also use mini-stories { _id, imgUrl }
    savedStoryIds: ['s104', 's111', 's423'], // can also use mini-stories { _id, imgUrl }
}