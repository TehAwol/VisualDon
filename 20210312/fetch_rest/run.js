const R = require('ramda');
const fetch = require('node-fetch');

const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts';

const OUTPUT = [];

const getUsername = (entry) => {return R.path(['username'], entry)};
const getCity = (entry) => {return R.path(['adress', 'city'], entry)};
const getCompanyName = (entry) => {return R.path(['company', 'name'], entry)};
const getUserID = (entry) => {return R.path(['id'])};

const getPostUserID = (entry) => {return R.path(['userId'], entry)};
const getPostTitles = (entry) => {return R.path(['title'], entry)}; 

fetch(URL_POSTS)
.then(response => response.json())
.then(json => console.log(json));


// Desired output
// [
//     {
//       nom_utilisateur: 'Machin',
//       ville: 'Truc',
//       nom_companie: 'Bidule',
//       titres_posts: [
//         'Titre 1',
//         'Titre 2',
//       ]
//     },
//     // ...
//   ]

// Current output
// {
//     id: 10,
//     name: 'Clementina DuBuque',
//     username: 'Moriah.Stanton',
//     email: 'Rey.Padberg@karina.biz',
//     address: {
//       street: 'Kattie Turnpike',
//       suite: 'Suite 198',
//       city: 'Lebsackbury',
//       zipcode: '31428-2261',
//       geo: [Object]
//     },
//     phone: '024-648-3804',
//     website: 'ambrose.net',
//     company: {
//       name: 'Hoeger LLC',
//       catchPhrase: 'Centralized empowering task-force',
//       bs: 'target end-to-end models'
//     }
//   }