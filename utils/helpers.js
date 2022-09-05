const isAuth = (req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    format_date: (date) => {
        let timestamp = date.toLocaleDateString('en-US', {weekday: 'short', month: 'short', year: 'numeric'})
        return timestamp
    },

    isAuth
} 

// Handlebars.registerHelper('format_date', function (createdAt) {
//     return createdAt.toLocalDateString()
// })
