![Downloads](https://img.shields.io/npm/dt/@goncharov-vlad/spa-router?style=for-the-badge)
![Size](https://img.shields.io/github/size/goncharov-vlad/spa-router/spa-router/out/build/bundle.js?style=for-the-badge)
![License](https://img.shields.io/github/license/goncharov-vlad/spa-router?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

# **SPA-router**

## **JS module to build a single-page application**

_A single-page application (SPA) is a web application or website that interacts with the user by dynamically rewriting
the current web page with new data from the web server, instead of the default method of a web browser loading entire
new pages. The goal is faster transitions that make the website feel more like a native app
<sub>[Wikipedia]</sub>_

## **What are the benefits and what this project can perform?**

* Passing of params to action with URL path like in a regular REST API
* It's fully types
* Can be used directly in browsers with `<script>` tag
* Built as UMD and supports CommonJS, ES6 modules
* The router stores all history, which means when client uses next/back buttons of the browser corresponding routes will be triggered
* Module built file is very small, and it doesn't use any additional packages, which makes the module fast and simple
* The router automatically finds all freshly dynamically added in DOM links (MutationObserver)
* You don't have to use an old hash style of path
* Router action is will not trigger in case of double click

## **Getting started**

It's easy to install, configure and use

### **Pre-requirements**
Since it is a js module, not a framework (at least for now), you need to make your HTTP static server redirects all requests through the same index page (Front Controller Pattern). There are a lot of ways to do it for any environment. Below is shown the faster way to do it if you are a JS developer

[See full example here](https://github.com/goncharov-vlad/spa-router/tree/master/environment)

```js 
const path = require('path')
const express = require('express')
const app = express()
const public = path.join(__dirname, 'public')
const ejs = require('ejs')
const port = 3000

app.engine('html', ejs.renderFile)

app.use(express.static(public))

app.set('view engine', 'html')

app.all('*', (req, res) => {
  res.render('index')
})

app.listen(port, () => console.log(`Ready on port ${port}`))
```

### **Installing**
Install the module and import it in one of the common ways. The router supports all of them

```shell
npm i @goncharov-vlad/spa-router
```

ES6 module `import`
```js
import Router from '@goncharov-vlad/spa-router'
```

CommonJS module `require`
```js
const Router = require('@goncharov-vlad/spa-router')
```

HTML tag `<script>`
```html
<script src="/path/to/cdn/file"></script>
```
_Please don't expose `node_modules` dir cause it's not about security. Host [built file](https://github.com/goncharov-vlad/spa-router/blob/master/spa-router/out/build/bundle.js) separately with a CDN or inside a public area_

### **Using**
Define config object and pass it to router instance
 
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
      pathTemplate: '/post/{postId}/comment/{commentId}',
      action: (values) => console.log(`Comment ${values.commentId} of post ${values.postId}`)
    }
  ]
}

new Router(config)
```

## **Full config overview**

* **config** `object` <sub>parent</sub>
    * **stack** `route[]` <sub>require</sub>

      _Array of routes_
    * **notFoundAction** `function`

      _Action will be executed when the route is not found. Default action is `() => console.log('not-found')`_

* **route** `object`

  _Specific route_
    * **pathTemplate** `string` <sub>require</sub>

      _Path by which action will be executed. **Ending slashes does matter!** Use value name inside curly braces to pass it to an action_
    * **action** `function` <sub>require</sub>

      _Action which will be executed. Use first param to get values from path_

## **Features**

After configuring the router use links as usually
```html
<a href='/post/11/comment/12'></a>
```
When link is clicked, the router matches link path to each path template from route stack and when path template is matched the router executes its action passing data from path as first parameter

Imagine you have that link and route with path template `/post/{postId}/comment/{commentId}` which will be matched after
click, and then you will be able to get `postId` with value `11` and `commentId` with value `12` inside action callback
by first parameter

Action callback can look like:

```js
(values) => console.log(`Comment ${values.commentId} of post ${values.postId}`)
```

__Of course, to pass value you also can use GET parameters__

## **Contributing**

Contribution is always welcome! Use [test environment](https://github.com/goncharov-vlad/spa-router/tree/master/environment) to develop new features and improve current code. Make pull requests to `dev` branch

### **Useful commands**
To start local development server 

```
npm run start --prefix environment
```
To watch if module code has been changed and bundle if so
```
npm run watch --prefix environment 
```
To make code dynamic rebuilding and readable
```
npm run dev --prefix spa-router 
```
To make code follow standard
```
npm run lint --prefix spa-router 
```
To build code ready to publish
```
npm run build --prefix spa-router 
```

## **Links**

Github - https://github.com/goncharov-vlad/spa-router

Npm - https://www.npmjs.com/package/@goncharov-vlad/spa-router

## **Licensing**

The code in this project is licensed under MIT license

## **Code styling**
![CodeStyle](https://cdn.rawgit.com/standard/standard/master/badge.svg)       