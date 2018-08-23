/* eslint-disable */

const addNamespaces = function (Vue, namespaces, value) {
	if (namespaces.length === 1) {
		Vue[namespaces[0]] = value
		Vue.prototype[namespaces[0]] = value

	} else {
		let namespace = namespaces.shift()
		let ret = addNamespaces((!(namespace in Vue) ? {} : Vue[namespace]), namespaces, value)
		Vue[namespace] = ret
		Vue.prototype[namespace] = ret
	}

	return Vue
}

const Install = function (namespaces, obj) {
	if (!Array.isArray(namespaces)) {
		namespaces = namespaces.split('.')
	}

	const first = namespaces[0]
	return {
		install(Vue) {
			let tmp = addNamespaces(Vue, namespaces, obj)

			Vue[first] = tmp[first]
			Vue.prototype[first] = tmp[first]
		}
	}
}

export default Install
