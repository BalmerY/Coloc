const { flatList, flatNew, flatCreate, flatDelete, flatEdit, flatUpdate } = require('../controllers/flat.controller');
const Flat = require('../database/models/flat.model');
const router = require('express').Router();



router.get('/new', flatNew );
router.get('/edit/:flatId', flatEdit);
router.get('/', flatList);
router.post('/update/:flatId', flatUpdate);
router.post('/', flatCreate);
router.delete('/:flatId', flatDelete);

module.exports = router;