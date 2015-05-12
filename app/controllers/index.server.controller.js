exports.render = function(req, res) {
  res.render('index', {
    title: 'Choons Rebuild',
    user: JSON.stringify(req.user)
//    userFullName: req.user ? req.user.fullName : ''
    });
};
//  req.session.lastVist = new Date();
