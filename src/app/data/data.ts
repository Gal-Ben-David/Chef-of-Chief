import { RecipeModel } from '../models/recipe.model'

export const recipes: Array<RecipeModel> = [
    {
        _id: 's101',
        txt: 'Bread',
        imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096294/bread_icszln.png',
        by: {
            _id: 'u101',
            fullname: 'Ulash Ulashi',
            imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
        },
        loc: {
            lat: 11.11,
            lng: 22.22,
            name: 'Tel Aviv',
        },
        comments: [
            {
                id: 'c1001',
                by: {
                    _id: 'u105',
                    fullname: 'Bob',
                    imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
                },
                txt: 'good one!',
                likedBy: [
                    {
                        _id: 'u105',
                        fullname: 'Bob',
                        imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
                    },
                ],
            },
            {
                id: 'c1002',
                by: {
                    _id: 'u106',
                    fullname: 'Dob',
                    imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
                },
                txt: 'not good!',
            },
        ],
        likedBy: [
            {
                _id: 'u105',
                fullname: 'Bob',
                imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
            },
            {
                _id: 'u106',
                fullname: 'Dob',
                imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
            },
        ],
        tags: ['fun', 'romantic'],
        createdAt: 1737898687000
    },
    {
        _id: 's102',
        txt: 'Abbadi',
        imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096355/abbadi_p5vvkh.png',
        by: {
            _id: 'u102',
            fullname: 'Abbi Abbambi',
            imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
        },
        loc: {
            lat: 11.11,
            lng: 22.22,
            name: 'Tel Aviv',
        },
        comments: [
            {
                id: 'c1001',
                by: {
                    _id: 'u105',
                    fullname: 'Bob',
                    imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
                },
                txt: 'good one!',
                likedBy: [
                    {
                        _id: 'u105',
                        fullname: 'Bob',
                        imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
                    },
                ],
            },
            {
                id: 'c1002',
                by: {
                    _id: 'u106',
                    fullname: 'Dob',
                    imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
                },
                txt: 'Yesss!',
            },
        ],
        likedBy: [
            {
                _id: 'u105',
                fullname: 'Bob',
                imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
            },
            {
                _id: 'u106',
                fullname: 'Dob',
                imgUrl: 'https://res.cloudinary.com/dvykycdey/image/upload/v1739096584/user-default_qjeegh.png',
            },
        ],
        tags: ['fun', 'romantic'],
        createdAt: 1737985087000
    }
]