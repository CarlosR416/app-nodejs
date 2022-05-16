const router = require('express').Router();

router.get('/productos', (req, res) => {
    res.send('mi ruta protegida'+res.locals.admin)
})

router.get('/dashboard', (req, res) => {
    res.render("pages/dashboard")
})

module.exports = router