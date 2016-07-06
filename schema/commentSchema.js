var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: String,
  creationDate: { type: Date, default: Date.now },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

commentSchema.statics = {
  findAllComments: function(callback) {
    return this.find({}).
      exec(callback);
  },
  findCommentById: function(id, callback) {
    return this.findOne({ _id: id }).
      exec(callback);
  }
};

module.exports = mongoose.model("Comment", commentSchema);
