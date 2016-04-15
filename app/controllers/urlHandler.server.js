'use strict';

var Urls = require('../models/url.js');
var url = require('url');

function isValidURL (longUrl) {
	// picky validation as per problem spec
	var re = /https*:\/\/www\.[^-][a-z\d-]*[^-]\.com(\/.*)*/i

	return re.test(longUrl)
}

function urlHandler () {

	this.newUrl = function(req, res) {
		
		var longUrl = req.url;
		longUrl = longUrl.slice(5);
		var host = 'http://'+req.headers.host+'/';

		if (!isValidURL(longUrl)) {
			res.json({ 'error': 'Invalid URL specified -- Please use the format "http://www.domain.com/blah/blah.blah"'})
		}

		Urls
			.findOne({ 'long': longUrl }, { '_id': false })
			.exec(function(err, result) {
				if (err) throw err;

				if (result) {
					console.log("Match exists. Returning matched URL.")
					console.dir(result);

					var ret = {
						'original_url': result.long,
						'short_url': host+result.short
					}

					res.json(ret);
				} else {
					console.log('No match found. Creating new URL.');
					
					Urls.findOne({})
						.sort('-short')
						.exec(function(err, doc) {
							if (doc)
								var key = doc.short + 1;
							else
								var key = 44;

							var newDoc = new Urls({
								'long': longUrl,
								'short': key
							})

							console.dir(JSON.stringify(newDoc));

							newDoc.save(function(err, doc) {
								if (err) throw err;		

								var ret = {
									'original_url': newDoc.long,
									'short_url': host+newDoc.short
								}

								res.json(ret);
							});
						});
				}
			});
	}

	this.getUrl = function (req, res) {
		var key = url.parse(req.url).pathname.slice(1);
		var host = 'http://'+req.headers.host+'/';

		Urls.findOne({ short: key })
			.exec(function(err, doc) {
				if (err) throw err;

				if (doc === null) {
					res.send('error: No such URL has been indexed by this service. Instructions on short URL creation can be found here: ' + host)
				} else {
					res.redirect(doc.long);
				}
			})
	}
}

module.exports = urlHandler;