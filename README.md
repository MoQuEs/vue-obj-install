# vue-obj-install
A simple function for install your `script/variables/objects/functions/...` into global `Vue` object.

## When to use it and when not to:
Use it when you want to use a lot of small function across full application, or want to add for example [lodash](https://lodash.com/) to all components but you don't want to import it from all components.

## Installing
```bash
npm install --save vue-obj-install
```

And in your entry JS file:
```javascript
import Vue from 'vue';
import install from 'vue-obj-install';

Vue.use(install('first_param', 'second_param'));
```

#### Usage:
This wrapper bind your `script/variables/objects/functions/...` to `Vue` or `this` in your defined namespace.

Function gets 2 params `install'a.b'`:
1. Array[string]|[string] - it is used to give namespace to your object when you pass string it will slice dots and make namespaces according to dots: `'a.b'` → `['a', 'b']` or you can pass created before array with namespaces `['a', 'b']`
2. Your `script/variables/objects/functions/...` you want to pass to `Vue`

#### Examples:
```javascript
import Vue from 'vue';
import install from 'vue-obj-install';
import lodash from 'lodash';

Vue.use(install('namespace', true)); // example 1
Vue.use(install('a.b', {success: true})); // example 2
Vue.use(install('_', lodash)); // example 3
Vue.use(install(['a', 'c'], {success: true})); // example 4
Vue.use(install(['cl'], console.log)); // example 5
```

```javascript
// example 1:
Vue.namespace; // → true
this.namespace; // → true

// example 2:
Vue.a.b; // → {success: true}
this.a.b; // → {success: true}
Vue.a.b.success; // → true
this.a.b.success; // → true

// example 3:
Vue._.now(); // → lodash: Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch (1 January 1970 00:00:00 UTC).

// example 5:
Vue.cl(true); // → console.log(true)
this.cl(true); // → console.log(true)
```