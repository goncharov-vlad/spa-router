# SPA-router

> JS module which helps build not reloading web applications.

It's easy to install, configure and use.

## Installing / Getting started

Run to get success with installation.

```shell
npm i goncharov-vlad/spa-router
```

That command is just common way to install JS module.

### Initial Configuration

1. Import module.

```js
import Router from '@goncharov-vlad/router'
```

2. Define config object and specify route stack as config property.

__Example__:

```js
let config =
    {
        'stack': [
            {
                'pathTemplate': '/',
                'action': () => console.log('Home')
            },
            {
                'pathTemplate': '/contact',
                'action': () => console.log('Contact')
            },
            {
                'pathTemplate': '/post/{postId}/comment/{commentId}',
                'action': (values) => console.log(`Comment ${values.commentId} of post ${values.postId}`)
            }
        ],
        'notFoundAction': () => console.log('Page not found')
    }
```

3. Create new router instance with defined config.

```js
new Router(config)
```

That's all.

## Features

After configuring the router, you can specify any html element as the route by adding the 'route' attribute to it with
the path.

```html
<a route='/post/11/comment/12'></a>
<div route='/contact'></div>
<button route='/'></button>
```

When element is clicked, the router matches the argument value to each path template from route stack and when path
template is matched executes it action passing data as first parameter.

__Example__:

Imagine you have route element:`<a route='/post/11/comment/12'></a>` and route with path
template `/post/{postId}/comment/{commentId}` witch will be matched after click, and then you will be able you
get `postId` with value `11` and `commentId` with value `12` inside action callback by first parameter.

Action callback can be looks like:

```js
(values) => console.log(`Comment ${values.commentId} of post ${values.postId}`)
```

### What's the bells and whistles this project can perform?

* The router stores all history, that does mean when client using next/back buttons of browser correspond routes will be
  triggered.

* Code of the module is very small, and it doesn't use any additional modules, that makes the module fast and simply.

* The router automatically finds all new dynamically added in DOM route elements (MutationObserver).

* There is exists check to not re-trigger current route.

* You don't have to use old hash style of path.

## Full config overview

* **config** `object` <sub>parent</sub>
    * **stack** `route[]` <sub>require</sub>

      _Array of routes_
    * **notFoundRoute** `function`

      _Action which will be executed when route is not found. Default action is `() => console.log('not-found')`_

* **route** `object`

  _Specific route_
    * **pathTemplate** `string` <sub>require</sub>

      _Path by which action will be executed. To pass values use name of value inside curly braces_
    * **action** `function` <sub>require</sub>

      _Action which will be executed. To get values from path use first param_

## Contributing

Contributions are always welcome!

Project have to use [jsDocs](https://jsdoc.app/). You also can get full documentation with
running `jsdoc -r path/to/roter/code`.

## Licensing

The code in this project is licensed under MIT license.
