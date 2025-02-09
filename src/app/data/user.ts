import { UserModel } from '../models/user.model';

export const user: UserModel = {
    _id: 'u101',
    username: 'Muko',
    password: 'mukmuk',
    fullname: 'Muki Muka',
    imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096673/gal_rz5dcd.png',
    bio: 'Master Chef 🧑‍🍳 | Developer 👩‍💻',

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
    likedRecipeIds: ['s105', 's122', 's173'], // can also use mini-stories { _id, imgUrl }
    savedRecipeIds: ['s104', 's111', 's423'], // can also use mini-stories { _id, imgUrl }
    myRecipes: []
}