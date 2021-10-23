'use strict';
! function () {
	function logerr(msg) {
		try {
			if ("undefined" == typeof console) {
				return;
			}
			if ("error" in console) {
				console.error(msg);
			} else {
				console.log(msg);
			}
		} catch (err) { }
	}

	function createLink(mail) {
		return wrapper.innerHTML = '<a href="' + mail.replace(/"/g, "&quot;") + '"></a>', wrapper.childNodes[0].getAttribute("href") || "";
	}

	function parseHex(string, position) {
		var result = string.substr(position, 2);
		return parseInt(result, 16);
	}

	function decode(href, startPos) {
		var result = "";
		var key = parseHex(href, startPos);
		for (var position = startPos + 2; position < href.length; position = position + 2) {
			var byte = parseHex(href, position) ^ key;
			result = result + String.fromCharCode(byte);
		}
		try {
			result = decodeURIComponent(escape(result));
		} catch (err) {
			logerr(err);
		}
		return createLink(result);
	}

	function searchLinks(doc) {
		var anchors = doc.querySelectorAll("a");
		for (var i = 0; i < anchors.length; i++) {
			try {
				var anchor = anchors[i];
				var index = anchor.href.indexOf(prefix);
				if (index > -1) {
					anchor.href = "mailto:" + decode(anchor.href, index + prefix.length);
				}
			} catch (err) {
				logerr(err);
			}
		}
	}

	function searchClasses(doc) {
		var elements = doc.querySelectorAll(selector);
		for (var i = 0; i < elements.length; i++) {
			try {
				var element = elements[i];
				var parent = element.parentNode;
				var code = element.getAttribute(attribute);
				if (code) {
					var mail = decode(code, 0);
					var e = document.createTextNode(mail);
					parent.replaceChild(e, element);
				}
			} catch (err) {
				logerr(err);
			}
		}
	}

	function searchTemplates(doc) {
		var templates = doc.querySelectorAll("template");
		for (var i = 0; i < templates.length; i++) {
			try {
				init(templates[i].content);
			} catch (err) {
				logerr(err);
			}
		}
	}

	function init(doc) {
		try {
			searchLinks(doc);
			searchClasses(doc);
			searchTemplates(doc);
		} catch (err) {
			logerr(err);
		}
	}

	var prefix = "/email-protection#";
	var selector = ".__email_protection__";
	var attribute = "data-email-protection";
	var wrapper = document.createElement("div");
	init(document);
	(function () {
		var current = document.currentScript || document.scripts[document.scripts.length - 1];
		current.parentNode.removeChild(current);
	})();
}();
