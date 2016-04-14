'use strict';

(function () {
	function updateExampleUsageLinks() {
		var links = document.getElementsByClassName('example-usage');

		for (var i = 0; i < links.length; i++) {
			var text = links[i].innerHTML;
			links[i].innerHTML = appUrl + text;
		}
	}
	
	ajaxFunctions.ready(updateExampleUsageLinks);
}) ();