var mongoose = require('mongoose'),
  Article = mongoose.model('Article');

// extract FIRST error message as to not overwhelm users with error
// messages so they can focus on one at a time
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
      }  else {
        return 'Uknown (possibly) server error. Sorry, Good luck mate';
      }
};

exports.create = function(req, res) {
  var article = new Article(req.body);
  article.creator = req.user;

  article.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

// retrieves list of existing articles using mongoose find() function,
// consider adding a mongoDB query. Also, possibly replace fullName w/ userName
exports.list = function(req, res) {
  Article.find().sort('-created').populate('creator', 'firstName lastName username').
  exec(function(err, articles) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};
// we love the mongoose populate() method
exports.articleByID = function(req, res, next, id) {
  Article.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, article) {
    if(err) return next(err);
    if(!article) return next (new Error('Failed to load article ' + id));

    req.article = article;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.article);
};

exports.update = function(req, res) {
  var article = req.article;

  article title = req.body.title;

  article.content = req.body.content;

  article.save(function(err) {
    if (err) {
      return res.status(400).send({
      message: getErrorMessage(err)
    });
    } else {
    res.json(article);
    }
  });
};

exports.delete = function(req, res) {
  var article = req.article;

  article.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};
