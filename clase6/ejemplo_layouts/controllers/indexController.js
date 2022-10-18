const controller = {
  index: function (req, res, next) {
    res.locals.user = { name: "Luis" }
    res.render('index', { title: 'Ejemplo Layouts' });
  },
  us: function (req, res, next) {
    res.locals.user = { name: "Luis" }
    res.render('index', { title: 'Nosotros' });
  },
  contact: function (req, res, next) {
    res.locals.user = { name: "Luis" }
    res.render('index', { title: 'Contacto' });
  }
}
module.exports = controller