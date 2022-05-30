const UsuarioController = require('../Controllers/UsuarioController');
module.exports = (app) => {
   app.post('/usuario', UsuarioController.post);
   app.put('/usuario/:id', UsuarioController.put);
   app.delete('/usuario/:id', UsuarioController.delete);
   app.get('/usuarios', UsuarioController.get);
   app.get('/usuario/:id', UsuarioController.getById);
}