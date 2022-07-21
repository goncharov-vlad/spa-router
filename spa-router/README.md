

<!-- 

Supports all types of module and browser
Why should I use the router ?
Describe development tutorials - enviroments
Fully typed
Slashes does matter!
Make frond controller pattern for server
 -->

<!-- Badges -->

![code style](https://cdn.rawgit.com/standard/standard/master/badge.svg)       

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

![downloads](https://img.shields.io/npm/dt/@goncharov-vlad/spa-router?style=for-the-badge)
![license](https://img.shields.io/github/license/goncharov-vlad/spa-router?style=for-the-badge)  

<!-- Main -->
# SPA-router

> JS module which helps to build not reloading web applications.


It's easy to install, configure and use.

_A single-page application (SPA) is a web application or website that interacts with the user by dynamically rewriting
the current web page with new data from the web server, instead of the default method of a web browser loading entire
new pages. The goal is faster transitions that make the website feel more like a native app.
<sub>[Wikipedia]</sub>_



## Installing / Getting started

Run to get success with installation.

```shell
npm i @goncharov-vlad/spa-router
```

This command is just common way to install JS module.

### Initial Configuration

1. Import module.

```js
import Router from '@goncharov-vlad/spa-router'
```

2. Define config object and specify route stack as config property.

__Example__:

```js
const config = {
  stack: [
    {
      pathTemplate: '/',
      action: () => console.log('Home')
    },
    {
      pathTemplate: '/contact',
      action: () => console.log('Contact')
    },
    {
      action: (values) => console.log(`Comment ${values.commentId} of post ${values.postId}`),
      pathTemplate: '/post/{postId}/comment/{commentId}',
    }
  ]
}
```

1. Create new router instance with defined config.

```js
new Router(config)
```

That's all.

## Features

After configuring the router just use links as usually

When link is clicked, the router matches link path to each path template from route stack and when path template is
matched the router executes its action passing data from path as first parameter.

__Example__:

```html
<a href='/post/11/comment/12'></a>
```

Imagine you have that link and route with path template `/post/{postId}/comment/{commentId}` which will be matched after
click, and then you will be able to get `postId` with value `11` and `commentId` with value `12` inside action callback
by first parameter.

Action callback can look like:

```js
(values) => console.log(`Comment ${values.commentId} of post ${values.postId}`)
```

__Of course, to pass data you also can use GET parameters__

### What's the bells and whistles this project can perform?

* The router stores all history, that means when client uses next/back buttons of browser the correspond routes will be
  triggered.

* Code of the module is very small, and it doesn't use any additional modules, that makes the module fast and simple.

* The router automatically finds all new dynamically added in DOM links (MutationObserver).

* You don't have to use old hash style of path.

## Full config overview

* **config** `object` <sub>parent</sub>
    * **stack** `route[]` <sub>require</sub>

      _Array of routes_
    * **notFoundAction** `function`

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
running `jsdoc -r path/to/this/module`.

## Links

Github - https://github.com/goncharov-vlad/spa-router

Npm - https://www.npmjs.com/package/@goncharov-vlad/spa-router

## Licensing

The code in this project is licensed under MIT license.
