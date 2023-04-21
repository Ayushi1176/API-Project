//array of object for whole book
const books = [
    {
        ISBN: "12345Book",
        title: "Tesla!!",
        pubDate: "2021-08-05",
        language: "en",
        numpage: 250,
        author: [1,2],
        publication: [1],
        category: ["tech", "space","education"]
    }
];

//array of object for author
const author = [
    {
        id: 1,
        name: "Ayushi",
        books: ["12345Book", "secretBook"]
    },
    {
        id: 2,
        name: "Sandeep",
        books: ["12345Book"]
       }
];

//array of object for publication
const publication = [
    {
        id: 1, 
        name: "writex",
        books: ["12345Book"]
    },

    {
        id: 2, 
        name: "writex2",
        books: []
    }
];

//this external data set has to be exported using module

module.exports = {books, author, publication};










