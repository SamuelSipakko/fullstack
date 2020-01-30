const _ = require('lodash')
require('lodash/array')
require('lodash/object')


const dummy = () => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((prev,cur) => prev + cur.likes, 0)
}

const favoriteBlog = blogs => {
    const ret =  blogs.sort((a,b) => b.likes - a.likes)[0]
    if (ret) 
        return { title: ret.title, author: ret.author, likes:ret.likes }
    return null
}


const mostBlogs = blogs => {
    const ret = _(blogs)
                .groupBy(x =>  x.author)
                .map((val, key) => ({ author: key, blogs: val.length }))
                .sortBy('blogs')
                .reverse()
                .value()[0]
    if (ret)
        return ret
    return null
}

const mostLikes = blogs => {
    const ret = _(blogs)
                .groupBy(x =>  x.author)
                .map((val, key) => {
                    const likes = val.reduce((p,n) => p + n.likes, 0)
                    return { author: key, likes: likes }
                })
                .sortBy('likes')
                .reverse()
                .value()[0]
    if (ret)
        return ret
    return null
}


module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}

