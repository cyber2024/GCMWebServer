var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var useridSchema = new Schema({
	id: String
}
);

module.exports = mongoose.model('UserIds', useridSchema);
