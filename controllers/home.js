// Imports
const category = require('../json/category.json');

const get = (req, res) => {
    res.render('home', { category, image: "myimage" })
}

module.exports = {
    get
}