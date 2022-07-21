import Router from '@goncharov-vlad/spa-router'

const config = {
  notFoundAction: () => render({
    notFoundAction: '404 NOT FOUND'
  }),
  stack: [
    {
      pathTemplate: '/',
      action: () => render({
        pathTemplate: '/',
        yourOptionalParameter: 'your optional value',
      })
    },
    {
      pathTemplate: '/contact',
      action: () => render({
        pathTemplate: '/contact',
        yourOptionalParameter: 'your optional value',
      })
    },
    {
      pathTemplate: '/about',
      action: () => render({
        pathTemplate: '/about',
        yourOptionalParameter: 'your optional value',
      })
    },
    {
      pathTemplate: '/another',
      action: () => render({
        pathTemplate: '/another',
        yourOptionalParameter: 'your optional value',
      })
    },
    {
      pathTemplate: '/post/{postId}',
      action: (values) => render({
        pathTemplate: '/post/{postId}',
        yourOptionalParameter: 'your optional value',
        values
      })
    },
    {
      pathTemplate: '/post/{postId}/comment/{commentId}',
      action: (values) => render({
        pathTemplate: '/post/{postId}/comment/{commentId}',
        yourOptionalParameter: 'your optional value',
        values
      })
    },
  ]
}

const router = new Router(config)

const render = (params) => {
  const json = {
    currentUrl: router.currentUrl,
    ...params
  }

  document.getElementById('json').innerHTML = JSON.stringify(json, undefined, 2)
}