exports.render = function(req, res) {
  res.render('index', {
    title: 'Choons Rebuild',
    userFullName: req.user ? req.user.fullName : ''
    });
};
//  req.session.lastVist = new Date();
