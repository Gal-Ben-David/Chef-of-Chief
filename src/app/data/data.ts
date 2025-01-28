import { RecipeModel } from '../models/recipe.model'

export const recipes: Array<RecipeModel> = [
    {
        _id: 's101',
        txt: 'Bread',
        imgUrl: '/img/food/bread.png',
        by: {
            _id: 'u101',
            fullname: 'Ulash Ulashi',
            imgUrl: '/img/user/user-default.png',
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
                    imgUrl: 'http://some-img',
                },
                txt: 'good one!',
                likedBy: [
                    {
                        _id: 'u105',
                        fullname: 'Bob',
                        imgUrl: 'http://some-img',
                    },
                ],
            },
            {
                id: 'c1002',
                by: {
                    _id: 'u106',
                    fullname: 'Dob',
                    imgUrl: 'http://some-img',
                },
                txt: 'not good!',
            },
        ],
        likedBy: [
            {
                _id: 'u105',
                fullname: 'Bob',
                imgUrl: 'http://some-img',
            },
            {
                _id: 'u106',
                fullname: 'Dob',
                imgUrl: 'http://some-img',
            },
        ],
        tags: ['fun', 'romantic'],
        createdAt: 1737898687000
    },
    {
        _id: 's102',
        txt: 'Abbadi',
        imgUrl: '/img/food/abbadi.png',
        by: {
            _id: 'u102',
            fullname: 'Abbi Abbambi',
            imgUrl: '/img/user/user-default.png',
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
                    imgUrl: 'http://some-img',
                },
                txt: 'good one!',
                likedBy: [
                    {
                        _id: 'u105',
                        fullname: 'Bob',
                        imgUrl: 'http://some-img',
                    },
                ],
            },
            {
                id: 'c1002',
                by: {
                    _id: 'u106',
                    fullname: 'Dob',
                    imgUrl: 'http://some-img',
                },
                txt: 'Yesss!',
            },
        ],
        likedBy: [
            {
                _id: 'u105',
                fullname: 'Bob',
                imgUrl: 'http://some-img',
            },
            {
                _id: 'u106',
                fullname: 'Dob',
                imgUrl: 'http://some-img',
            },
        ],
        tags: ['fun', 'romantic'],
        createdAt: 1737985087000
    }
]