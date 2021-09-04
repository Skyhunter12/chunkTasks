const { getAllBooks,
        getAllBooksByCount,
        postBook,
        updateBook,
        getBookById,
        deleteById} = require('../controller/booksController')
let express = require('express')
let router = express.Router();

router.get('/',getAllBooks)
router.get('/rating',getAllBooksByCount);
router.post('/',postBook);
router.put('/:id',updateBook);
router.get('/:id',getBookById)
router.delete('/:id',deleteById)

module.exports = router