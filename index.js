//PROJECT=>  BOOK MANAGEMENT PROJECT

// require express for project
const express = require("express");

//require BODY PARSER for post the data
var bodyParser = require("body-parser");

//Database imported here from database.js
const database = require("./database");

//initialize express
const booky = express();

//allow express to read the body and encode it to json
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

//------------1. Book Part--------------------------------
//to get all the books and check the connection is correct we create an API here
/*
Route:          root(/)
Description:    get all the books
Access:         public
Parameter:      none
Method:         get
*/
booky.get("/", (req,res) => {
    return res.json({books: database.books});
});


// to get the specific books
/*
Route:          /is
Description:    get specific book on ISBN
Access:         public
Parameter:      ISBN
Method:         get
*/
booky.get("/is/:isbn", (req,res) => {                      //is is a parameter
    const getSpecificbook = database.books.filter((book) => book.ISBN === req.params.isbn);
    //check array is empty or not
    if (getSpecificbook.length === 0) {
        return res.json({error: `No book has found for the ISBN of ${req.params.isbn}`});   // `` for dynamic data
    } else {
        return res.json({book: getSpecificbook});
}
});
       
// to get list of books based on category
/*
Route:          /c
Description:    get specific book on category
Access:         public
Parameter:      category
Method:         get
*/
booky.get("/c/:category", (req,res) => {                
    const getSpecificbook = database.books.filter((book) => book.category.includes(req.params.category));
    //check array is empty or not
    if (getSpecificbook.length === 0) {
        return res.json({error: `No book has found for the category of ${req.params.category}`});   // `` for dynamic data
    } else {
        return res.json({book: getSpecificbook});
}
});

// to get list of books based on category
/*
Route:          /l
Description:    get specific book on category
Access:         public
Parameter:      category
Method:         get
*/
booky.get("/l/:language", (req,res) => {                
    const getSpecificbook = database.books.filter((book) =>  book.language === req.params.language);
    //check array is empty or not
    if (getSpecificbook.length === 0) {
        return res.json({error: `No book has found for the category of ${req.params.language}`});   // `` for dynamic data
    } else {
        return res.json({book: getSpecificbook});
}
});

//------------2. Author Part--------------------------------
/*
Route:          /author
Description:    get all author
Access:         public
Parameter:      none
Method:         get
*/

booky.get("/author", (req,res) => {                
    return res.json({authors: database.author});
});

//to get specific author(based on id)
/*
Route:          /author
Description:    get specific author
Access:         public
Parameter:      none
Method:         get
*/

booky.get("/author/:id", (req,res) => {                
    const getSpecificAuthor = database.author.filter((author) =>  author.id === parseInt(req.params.id));
    if (getSpecificAuthor.length === 0) {
        return res.json({error: `No author has found for the id of ${req.params.isbn}`});   // `` for dynamic data
    } else {
        return res.json({book: getSpecificAuthor});
}
});


//to get a list of authors based on the book isbn
/*
Route:          /author/book
Description:    get all author based on books isbn
Access:         public
Parameter:      isbn
Method:         get
*/

booky.get("/author/book/:isbn", (req,res) => {                
    //create a callback function
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));
    
    //check array
    if (getSpecificAuthor.length === 0) {
        return res.json({error: `No author found for the book ${req.params.isbn}`});
    }
    return res.json({authors: getSpecificAuthor});  
});

//------------3.Publicaton Part--------------------------------

//To get all the Publications
/*
Route:          /publications
Description:    get all publications
Access:         public
Parameter:      none
Method:         get
*/
booky.get("/publications", (req,res) => {                
    return res.json({publications: database.publication});
});

// to get a specific publications
/*
Route:          /publications/id
Description:    get all publications based on book
Access:         public
Parameter:      isbn
Method:         get
*/
booky.get("/publications/id/:id", (req,res) => {                
    //create a callback function
    const getSpecificPub = database.publication.filter((publication) =>  publication.id === parseInt(req.params.id));
    
    //check array
    if (getSpecificPub.length === 0) {
        return res.json({error: `No author found for the book ${req.params.id}`});
    }
    return res.json({publications: getSpecificPub});  
});


// to get a list to publication based on book 
/*
Route:          /publications/books
Description:    get all publications based on book
Access:         public
Parameter:      isbn
Method:         get
*/
booky.get("/publications/book/:isbn", (req,res) => {                
    //create a callback function
    const getSpecificPub = database.publication.filter((publication) => publication.books.includes(req.params.isbn));
    
    //check array
    if (getSpecificPub.length === 0) {
        return res.json({error: `No author found for the book ${req.params.isbn}`});
    }
    return res.json({publications: getSpecificPub});  
});

// POST---------------------------------------------
/*
Route:          /book/new
Description:    Add new books
Access:         public
Parameter:      NONE
Method:         POST
*/

booky.post("/book/new", (req,res) => {
    const newBook = req.body;   //in body we are passing new book
    database.books.push(newBook);
    return res.json({updatedBook : database.books});
});

//  ADD NEW AUTHOR
/*
Route:          /author/new
Description:    Add new author
Access:         public
Parameter:      NONE
Method:         POST
*/

booky.post("/author/new", (req,res) => {
    const newAuthor = req.body;   //in body we are passing new author object
    database.author.push(newAuthor);
    return res.json({updatedBook : database.author});
});

//  ADD NEW PUBLICATION
/*
Route:          /publication/new
Description:    Add new publications
Access:         public
Parameter:      NONE
Method:         POST
*/

booky.post("/publication/new", (req,res) => {
    const newPub = req.body;   //in body we are passing new book
    database.publication.push(newPub);
    return res.json({updatedBook : database.publication});
});


//  PUT
/*
Route:          /publication/update
Description:    update or add a new publication
Access:         public
Parameter:      isbn
Method:         PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
    //update the publication database
    database.publication.forEach((pub)=> {
        if (pub.id===req.body.pubId) {
           return pub.books.push(req.params.isbn);
        } 
    });
    //update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json ({
        books: database.books,
        publications: database.publication,
        message: "Successfully updated publications"

    });
});

//  DELETE
/*
Route:          /book/delete
Description:    delete a book
Access:         public
Parameter:      isbn
Method:         DELETE
*/

booky.delete("/book/delete/:isbn", (req,res) => {
// whichever book that doesnot match with the isbn send it to updatedBookDatabase array 
//and the rest will be filter out 

const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn )
    database.books = updatedBookDatabase;
    return res.json({books: database.books});
    });

//  Delete author from a book
/*
Route:          /book/delete
Description:    delete an author
Access:         public
Parameter:      isbn
Method:         DELETE
*/


//  delete author from book and related book from author
/*
Route:          /book/delete/author
Description:   delete author from book and related book
Access:         public
Parameter:      isbn, authorId
Method:         DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res)=> {
//update the book database
database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
        const newAuthorList = book.author.filter(
            (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
        );
        book.author = newAuthorList;
        return;
    }
});

// update the author datadase   
database.author.forEach((eachAuthor)=> {
    if (eachAuthor.id === parseInt(req.params.authorId)) {
        const newBookList = eachAuthor.books.filter(
            (book) => book !== req.params.isbn);
            eachAuthor.books = newBookList;
            return;
    }
});

    return res.json ({
        book: database.books,
        author: database.author,
        message: "Author was deleted!!!"
    });
});


//listen to port 3000
booky.listen(3000, () => {
    console.log("Server is up and running");
});