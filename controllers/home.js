// Imports
const category = require('../json/category.json');
const posts = require('../json/posts.json');


const get = (req, res) => {
    res.render('home', { category, posts })
}

module.exports = {
    get
}