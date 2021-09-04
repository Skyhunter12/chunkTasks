let Book = require('../model/bookModel');

exports.getAllBooksByCount = async (req,res,next)=>{
    try {
        let success = false;
        if(!Book){
            res.status(400).json({
                'message':'Looks like don\'t have books yet',
                'success':success
            })
        }else{
        success = true    
       let sortedBooks = await Book.aggregate([
            { 
                "$group": {
                    "_id": { 
                        "book": "$name",
                        "rating": "$rating"
                    },
                    "count": { "$sum": 1 }
                }
            },
            { 
                "$group": {
                    "_id": "$_id.book",
                    "counts": {
                        "$push": {
                            "rating": "$_id.rating",
                            "count": "$count"
                        }
                    }
                }
            }
        ]);
        res.status(200).json({
            'message':'All books are retreived',
            'success':success,
            'books':sortedBooks
        })
    }
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'success':false
        })
    }
}

exports.getAllBooks = async (req,res,next)=>{
    try {
        let allBooks =await Book.find()
        res.status(200).json({
            'message':'All books are retreived',
            'success':true,
            'data':allBooks
        })
    } catch (error) {
        res.status(500).json({
            'message':'Network Error',
            'success':false,
            'Error':error
        })
    }
}

exports.postBook = async (req,res,next)=>{
    try {
        let success = false;
        if(!req.body){
            res.status(400).json({
                'message':'please add all fields required to add new book',
                'success':success
                })
        }else{
        success = true   
        console.log(req.body); 
        let {name, genre,author,rating} = req.body;
        let newBook =new Book({
            name:name,
            genre:genre,
            author:author,
            rating:rating
        })
        savedBook = await newBook.save();
        console.log(savedBook);
        res.status(200).json({
            'message':'New book added to bookList',
            'success':success,
            'BookAdded':savedBook
        })
    }
    } catch (error) {
        res.status(500).json({
            'message':'Network Error',
            'success':false,
            'Error':error
        })
    }
}
exports.updateBook = async (req,res,next)=>{
    try {
       
        let bookId = req.params.id;
        let updatedbook =await Book.findByIdAndUpdate({_id:bookId},req.body,{new:true})
        let latestBook =await updatedbook.save();
        res.status(200).json({
            'message':'Book details updated successfully',
            'success':true,
            'updatedData':latestBook
        })
    } catch (error) {
        res.status(500).json({
            'message':'Network Error',
            'success':false,
            'Error':error
        })
    }
}

exports.getBookById = async (req,res,next)=>{
    try {
        let bookId = req.params.id
        retreivedBook = await Book.findById({_id:bookId})
        res.status(200).json({
            'message':'retreived book successfully',
            'success':true,
            'bookdetails':retreivedBook
        })
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'success':false,
            'error':error
        })
    }
}

exports.deleteById =async (req,res,next)=>{
    try {
        let bookId = req.params.id
        deleted = await Book.deleteOne({_id:bookId})
        res.status(200).json({
            'message':'Deleted book successfully',
            'success':true,
            'bookdetails':deletedBook
        })
    } catch (error) {
        res.status(500).json({
            'message':'Network error',
            'success':false,
            'error':error
        })
    }
}