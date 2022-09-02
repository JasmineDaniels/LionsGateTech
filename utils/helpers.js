const isAuth = (req, res, next) => {
    if (req.session.isAuth){
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    format_date: (date) => {
        let timestamp = date.toLocaleDateString('en-US', {weekday: 'long', month: 'short', year: 'numeric'})
        return timestamp
    },

    isAuth
} 

// Handlebars.registerHelper('format_date', function (createdAt) {
//     return createdAt.toLocalDateString()
// })
