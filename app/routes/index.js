'use strict';

var path = process.cwd();
var UrlHandler = require(path + '/app/controllers/urlHandler.server.js');

module.exports = function (app) {
	
	var urlHandler = new UrlHandler();

	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/new/*')
		.get(urlHandler.newUrl);

	app.route('*')
		.get(urlHandler.getUrl);
};