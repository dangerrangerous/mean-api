var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  website: {
    type: String,
    set: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://')
 !== 0) {
          url = 'https://' + url;
        }
        return url;
        }
    }
  },
  password: String,
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual('fullname').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = fullName[0] || '';
  this.lastName = fullName[1] || '';
});
// static method
UserSchema.statics.findOneByUsername = function(username, callback) {
  this.findOne({ username: new RegExp (username, 'i') }, callback);
};
// mongoose modifier
UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);
