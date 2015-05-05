exports.render = function(req, res) {
  if(req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVist = new Date();

  res.render('index', {
    title: "Choons Rebuild"
  });
};
