![Downloads](https://img.shields.io/npm/dt/@goncharov-vlad/spa-router?style=for-the-badge)
![Size](https://img.shields.io/github/size/goncharov-vlad/spa-router/spa-router/out/build/bundle.js?style=for-the-badge)
![License](https://img.shields.io/github/license/goncharov-vlad/spa-router?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

# **SPA-router**

## **JS module which helps to build not reloading web applications**

_A single-page application (SPA) is a web application or website that interacts with the user by dynamically rewriting
the current web page with new data from the web server, instead of the default method of a web browser loading entire
new pages. The goal is faster transitions that make the website feel more like a native app
<sub>[Wikipedia]</sub>_

## **What are the benefits and what this project can perform ?**

* Passing of params to action with url path like in a regular REST API
* It's fully types
* Can be used directly in browser with `<script>` tag
* Buit as UMD and supports CommonJS, ES6 modules
* The router stores all history, that means when client uses next/back buttons of browser the correspond routes will be
  triggered
* Code of the module is very small, and it doesn't use any additional packages, that makes the module fast and simple
* The router automatically finds all new dynamically added in DOM links (MutationObserver)
* You don't have to use old hash style of path
* Router action is will not trigger in case of double click

## **Getting started**

It's easy to install, configure and use

### **Pre-requirements**
As it stills be a js module, not a framework (at least for now) you need to say http static server redirects all requests through the same index page (Front Controller Pattern). There is a lot of ways to do it for any environment. Bellow shown the most faster way to get it if your are a JS developer

[See full example here](../environment)

```js 
const path = require('path')
const express = require('express')
const app = express()
const public = path.join(__dirname, 'public')
const ejs = require('ejs')
const port = 3000

app.engine('html', ejs.renderFile);

app.use(express.static(public));

app.set('view engine', 'html');

app.all('*', (req, res) => {
  res.render('index')
})

app.listen(port, () => console.log(`Ready on port ${port}`))
```

### **Installing**
Install module and import it with one of a common ways, the router supports all of them

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
<script scr="/path/to/cdn/file"></script>
```
_Please don't expose `node_modules` dir, it's not about security. Host [built file](out/build/bundle.js) separatly with a CDN or inside public area_

### **Using**
Define config object and pass the object to router instance
 
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
      pathTemplate: '/post/{postId}/comment/{commentId}'
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

      _Action which will be executed when route is not found. Default action is `() => console.log('not-found')`_

* **route** `object`

  _Specific route_
    * **pathTemplate** `string` <sub>require</sub>

      _Path by which action will be executed. **Ending slashes does matter!** To pass values use name of value inside curly braces_
    * **action** `function` <sub>require</sub>

      _Action which will be executed. To get values from path use first param_

## **Features**

After configuring the router just use links as usually
```html
<a href='/post/11/comment/12'></a>
```
When link is clicked, the router matches link path to each path template from route stack and when path template is matched the router executes its action passing data from path as first parameter

__For Example__

Imagine you have that link and route with path template `/post/{postId}/comment/{commentId}` which will be matched after
click, and then you will be able to get `postId` with value `11` and `commentId` with value `12` inside action callback
by first parameter.

Action callback can look like:

```js
(values) => console.log(`Comment ${values.commentId} of post ${values.postId}`)
```

__Of course, to pass data you also can use GET parameters__

## **Contributing**

Contribution is always welcome! Use [test environment](../environment) to develop new features and improve current code. Make pull requests to `dev` branch

### **Usefull commands**
To start local development server 

```
npm run start --prefix environment
```
To watch if module code has been changed and rebundle if it is
```
npm run watch --prefix environment 
```
To make dynamic rebuilding and readable code
```
npm run dev --prefix spa-router 
```
To make code follow to standard
```
npm run lint --prefix spa-router 
```
To build ready to publish code
```
npm run build --prefix spa-router 
```

## **Links**

Github - https://github.com/goncharov-vlad/spa-router

Npm - https://www.npmjs.com/package/@goncharov-vlad/spa-router

## **Licensing**

The code in this project is licensed under MIT license.

## **Code Styling**
![CodeStyle](https://cdn.rawgit.com/standard/standard/master/badge.svg)       