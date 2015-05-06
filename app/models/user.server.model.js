var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: {
    type: String,
    trim: true
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

UserSchema.set('toJSON', { getters: true });
mongoose.model('User', UserSchema);
