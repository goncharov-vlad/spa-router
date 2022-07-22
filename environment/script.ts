import Router from 'lib'

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

function render(params) {
  const json = {
    currentUrl: window.location.pathname + window.location.search,
    ...params
  }

  document.getElementById('json').innerHTML = JSON.stringify(json, undefined, 2)
}

new Router(config)