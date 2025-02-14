export const isAuthenticated = (req, res, next) => {
    const user = req.user
    if(!user) {
        res.redirect('/auth/login')
    }
    next()
}