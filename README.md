# apollo-graphql-tutorial

an adaptation of https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b using apollo client 2.0 code and a graphql server/schema based on [Egghead's 'how to build a graphql server' course](https://egghead.io/courses/build-a-graphql-server). apollo-link-state example code based on [Sara Vieira's tutorial](https://www.youtube.com/watch?v=2RvRcnD8wHY&feature=youtu.be)

server code: https://github.com/ChrisMLee/egghead-graphql-server

new 2.0 setup: https://www.apollographql.com/docs/react/basics/setup.html  

to start:  
`egghead-graphql-server $ node index.js`  
`apollo-graphql-tutorial/client $ yarn start`  
`visit http://localhost:3000/`

Helpful references:  
proxy create-react-app requests: https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/  
https://github.com/facebookincubator/create-react-app/issues/1378#issuecomment-337740459

[Part 1: the frontend](https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b)

1. Build a simple React app with GraphQL and Apollo
2. Build a simple GraphQL server in 15 mins
3. Adding mutations to your React/GraphQL app

More ideas for later (building on each other)...

... client:
- Advanced: updating the GraphQL store after mutations
- mutations and optimistic UI
- Pagination
- Developer tools for GraphQL
- A quick tour of GraphiQL


... server:
- connecting to a REST backend
- connecting to a Mongo backend
- connecting to a SQL backend
- advanced: structuring your GraphQL server
- modularizing your GraphQL schema

... full-stack
- CRUD mutations in GraphQL: create
- CRUD mutations in GraphQL: update
- CRUD mutations in GraphQL: delete


