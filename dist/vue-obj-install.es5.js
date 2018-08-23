'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/* eslint-disable */

var addNamespaces = function addNamespaces(Vue, namespaces, value) {
	if (namespaces.length === 1) {
		Vue[namespaces[0]] = value;
		Vue.prototype[namespaces[0]] = value;
	} else {
		var namespace = namespaces.shift();
		var ret = addNamespaces(!(namespace in Vue) ? {} : Vue[namespace], namespaces, value);
		Vue[namespace] = ret;
		Vue.prototype[namespace] = ret;
	}

	return Vue;
};

var Install = function Install(namespaces, obj) {
	if (!Array.isArray(namespaces)) {
		namespaces = namespaces.split('.');
	}

	var first = namespaces[0];
	return {
		install: function install(Vue) {
			var tmp = addNamespaces(Vue, namespaces, obj);

			Vue[first] = tmp[first];
			Vue.prototype[first] = tmp[first];
		}
	};
};

exports.default = Install;
