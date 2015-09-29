exports.startServer = function startServer(port, path, callback) {

  var express     = require('express');
  var compression = require('compression');
  var favicon     = require('serve-favicon');

  var app       = module.exports = express.createServer();
  var port      = process.env.port || 3000;
  var io        = require('socket.io').listen(app.listen(port, '0.0.0.0'));

  var Firebase  = require('firebase');
  var device    = require('express-device');

  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session({secret: 'string'}));

  // Configuration
  app.configure(function() {
    app.set('views', __dirname + '/public/views');
    app.set('view engine', 'jade');
    //app.use(express.compress());
    app.use(express.bodyParser());
    app.use(device.capture());
    app.use(express.methodOverride());

    device.enableDeviceHelpers(app);

    app.use(app.router);
    app.use(express.static(__dirname + '/public/assets'));
    app.use(express.static(__dirname + '/public/images'));
    app.use(favicon(__dirname + '/public/images/favicon.ico'));
    app.use(compression());
  });

  /**
   * Récuperation des urls Firebase pour le stockage des données
   */
  var cloud = require('./config.json');

  app.configure('development', function() {
    fire = new Firebase(cloud.url.development);
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
  });

  app.configure('production', function() {
    fire = new Firebase(cloud.url.production);
    app.use(express.errorHandler());
  });

  /**
   * Gestion Socket.io
   */
  var count = 0;

  var site = io.on('connection', function(client) {
    count++;
    fire.child('/visitor/current').set(count);

    fire.child('/visitor/list').once('value', function(snap) {
      var totalUser = Object.keys(snap.val()).length;
      site.emit('totalUser', totalUser);
    });

    site.emit('currentUser', count);

    client.on('userInfo', function(user) {
      // satelize.satelize({}, function(err, geoData) {
      //   if(typeof err != 'null'){
      //     var ip = JSON.parse(geoData);
      //     console.log(ip);
      //   }
      // });
      //fire.child('/visitor/list/').push(user);
    });

    client.on('getRoomId', function() {
      /**
      *@todo
      *   - Générer une roomId et verifier si existe pas deja.
      */
      site.emit('roomIdGenerated', 2334);
    });

    client.on('roomConnect', function(roomId) {

      client.room = roomId;

      client.join(roomId);
      console.log('roomId', roomId);

      site.in(roomId).emit('roomConnected', {
        boolean: true,
        roomId: roomId
      });
    });

    client.on('disconnect', function() {
      count--;
      site.emit('currentUser', count);
      fire.child('/visitor/current').set(count);
    });
  });

  /**
   * Gestion des Routes
   */
  app.get('/', function(req, res) {
    var dataHome = {};

    /**
     * Récupération des données sur le cloud correspondante à la home
     */
    fire.child('/home').once('value', function(data) {

      dataHome = data.val();

      res.render('info', {
        data: dataHome,
        deviceType: res.locals.device_type,
        isMobile: res.locals.is_phone
      });

    });

  });

  /* TODO: Gestion de la telecomande pour interagir avec l'ordinateur*/
  app.get('/game/:id', function(req, res) {
    var roomId = req.params.id;
    res.render('game', {roomId: roomId, requireGameInit: true});
  });

  app.get('/remote', function(req, res) {
    /* TODO: Générer un nombre 4 chiffres puis verifier si une room n'existe pas déjà avec le même ID*/
    var roomId = 2345;
    res.render('remote', {id: roomId});
  });

  /**
   * Gestion de l'admin et l'accès au manager
   */
  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.post('/login', function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    fire.authWithPassword({
      'email': email,
      'password': password
    }, function(error, authData) {
      if (error) {
        //console.log('Login Failed!', error);
        res.redirect('login');
      } else {
        //console.log('Authenticated successfully with payload:', authData);
        req.session.regenerate(function() {
          req.session.user = email;
          res.redirect('/manager');
        });
      }
    });

  });

  app.get('/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  });

  app.get('/manager', restrict, function(req, res) {
    res.render('manager', {manager: true});
  });

  function restrict(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
  }

  app.listen(port, function() {
    var lenv = app.settings.env;
    var lport = app.address().port;
    console.log('Express server listening on port %d in %s mode', lport, lenv);
  }, callback);
};
