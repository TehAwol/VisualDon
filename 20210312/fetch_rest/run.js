const R = require('ramda');
const fetch = require('node-fetch');

const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts';

const getUsername = (entry) => {return R.path(['username'], entry)};
const getCity = (entry) => {return R.path(['address', 'city'], entry)};
const getCompanyName = (entry) => {return R.path(['company', 'name'], entry)};
const getUserID = (entry) => {return R.path(['id'], entry)};

const getPostUserID = (entry) => {return R.path(['userId'], entry)};
const getPostTitles = (entry) => {return R.path(['title'], entry)}; 

async function getData(url){
    let response = await fetch(url);
    let data = response.json();
    return data;
}

async function main(){
    let usersData = await getData(URL_USERS);
    let postsData = await getData(URL_POSTS);

    let output = [];

    usersData.forEach(elem => {

        uID = getUserID(elem);

        let titles = [];

        postsData.forEach(post => {
            if (getPostUserID(post) === uID) {
                titles.push(getPostTitles(post));
            }
        })
        
        tmp = [{
            "nom_utilisateur": getUsername(elem),
            "ville": getCity(elem),
            "nom_companie": getCompanyName(elem),
            "titres_posts": titles
        }];

        output.push(tmp);
    });

    console.log(JSON.stringify(output))
}

main();

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

// Current post
// {
//     userId: 10,
//     id: 100,
//     title: 'at nam consequatur ea labore ea harum',
//     body: 'cupiditate quo est a modi nesciunt soluta\n' +
//       'ipsa voluptas error itaque dicta in\n' +
//       'autem qui minus magnam et distinctio eum\n' +
//       'accusamus ratione error aut'
//   }