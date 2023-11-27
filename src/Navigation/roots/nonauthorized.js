import { login } from 'Constants/routes'

export default rootElementRoute => {
  const rootRoute = rootElementRoute || login

  return {
    stack: {
      children: [
        {
          component: {
            id: rootRoute,
            name: rootRoute,
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      ],
      options: {
        animations: {
          setStackRoot: {
            content: {
              x: {
                from: 1000,
                to: 0,
                duration: 300,
              },
            },
          },
          push: {
            content: {
              x: {
                from: 1000,
                to: 0,
                duration: 300,
              },
            },
          },
          pop: {
            content: {
              x: {
                from: 0,
                to: 1000,
                duration: 300,
              },
            },
          },
        },
      },
    },
  }
}
