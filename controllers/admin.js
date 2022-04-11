const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const postsPath = resolve(__dirname, '../json/posts.json')
const categoryPath = resolve(__dirname, '../json/category.json')
const posts = JSON.parse(readFileSync(postsPath))
const category = JSON.parse(readFileSync(categoryPath))

const get = (req, res) => {
    res.render('admin', { category })    
}


const post = (req, res) => {

    console.log(req.body);
    console.log(req.files);
    const { image, thumbnail } = req.files

    let headers = JSON.parse(req.body.headers)
    let paragraphs = JSON.parse(req.body.paragraphs)
    // Render
    let html = ''
    html += `<h1 class='text-2xl font-bold mx-3 my-4'>${headers[0]}</h1>`
    for (let i = 1; i < headers.length; i++){
        html += `<h2 class='text-xl font-medium mx-3 my-6'>${headers[i]}</h2>`
    }

    html += `<img class='w-full m-3 rounded-lg' src='${req.protocol + '://' + req.get('host') + `/img/${image[0].filename}`}' alt='post-img'> `

    paragraphs.forEach(paragraph => html += `<p class='m-3'>${paragraph}</p>`)
    

    const date = new Date()
    posts.push({
        id: posts.length ? posts.at(-1).id + 1 : 1,
        category: +req.body.category,
        title: req.body.title,
        date: {
            date: date.toLocaleDateString('uz-UZ'),
            time: date.toLocaleTimeString('uz-UZ')
        },
        thumbnail: req.body.type == 'file' ? req.protocol + '://' + req.get('host') + `/img/${thumbnail[0].filename}` : req.body.thumbnailUrl,
        html
    })
    const categoryFind = category.find(item => item.id == req.body.category)
    categoryFind.posts++
    writeFileSync(postsPath, JSON.stringify(posts, null, 4))
    writeFileSync(categoryPath, JSON.stringify(category, null, 4))
    res.json({
        status: 200
    })
}


module.exports = {
    get,
    post
}