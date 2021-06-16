# SPA-router

> JS module which helps build not reloading web applications.

It's easy to install, configure and use.

## Installing / Getting started

Run to get success with installation

```shell
npm i goncharov-vlad/spa-router
```

That command is just common way to install JS module

### Initial Configuration

* Import module

```js
import Router from '@goncharov-vlad/router'
```

* Define config object and specify route stack as config property. Default action which will be executed when route is
  not found: `console.log('not-found')`. To rewrite action which will be executed when route is not found
  specify `notFoundAction` as config property.

```js
let config =
    {
        'stack': [
            {
                'pathTemplate': '/',
                'action': () => console.log('Home')
            },
            {
                'pathTemplate': '/post/{postId}/comment/{commentId}',
                'action': (values) => console.log(`Comment ${values.commentId} of post ${values.postId}`)
            },
            {
                'pathTemplate': '/contact',
                'action': () => console.log('Contact')
            }
        ],
        'notFoundAction': () => console.log('Page not found')
    }
```
[here](#initial-configuration)
* Create new router instance with defined config

```js
new Router(config)
```
  
That's all

## Features

What's all the bells and whistles this project can perform?

* Called route will not be executed if that is current
* Router works when you use

* What's the main functionality
* You can also do another thing
* If you get really randy, you can even do this

## Contributing

When you publish something open source, one of the greatest motivations is that anyone can just jump in and start
contributing to your project.

These paragraphs are meant to welcome those kind souls to feel that they are needed. You should state something like:

"If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome."

If there's anything else the developer needs to know (e.g. the code style guide), you should link it here. If there's a
lot of things to take into consideration, it is common to separate this section to its own file called
`CONTRIBUTING.md` (or similar). If so, you should say that it exists here.

## Links

Even though this information can be found inside the project on machine-readable format like in a .json file, it's good
to include a summary of most useful links to humans using your project. You can include links like:

- Project homepage: https://your.github.com/awesome-project/
- Repository: https://github.com/your/awesome-project/
- Issue tracker: https://github.com/your/awesome-project/issues
    - In case of sensitive bugs like security vulnerabilities, please contact my@email.com directly instead of using
      issue tracker. We value your effort to improve the security and privacy of this project!
- Related projects:
    - Your other project: https://github.com/your/other-project/
    - Someone else's project: https://github.com/someones/awesome-project/

## Licensing

One really important part: Give your project a proper license. Here you should state what the license is and how to find
the text version of the license. Something like:

"The code in this project is licensed under MIT license."
