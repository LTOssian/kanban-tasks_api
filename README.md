# kanban-tasks_api

## The Challenge

The goal is to create a simple Crud RESTful Api for a task management app similar to Trello.
The API would allow users to create boards of tasks, tasks and subtasks.

## Installation

```bash
git clone https://github.com/LTOssian/kanban-tasks_api/
cd kanban-tasks_api
npm install
```

## Tech Stack

Built with :
- NodeJS (in TypeScript with the lib ts-node)
- ExpressJS

Database :
- MySQL
- Kysely Query Builder

## Continued Development

As this was my first REST Api, I had decided not to use an ORM such as Prisma in order to maintain a low level of abstraction between the SQL Queries and my code which is why I opted for a Query Builder such as Kysely to at least gain the security & typesafety aspects.

I learned a lot during this project and building this in a 3-tier architecture was a great idea. 

For future project I should write tests for the API and take more time to think about the best way to return the most crucial informations to the user.

## Resources

- [Kysely's Documentation](https://github.com/kysely-org/kysely)
- [ExpressJS Official Doc](https://expressjs.com/en/guide/routing.html)
- [ExpressJs Doc on the MDN](https://developer.mozilla.org/fr/docs/Learn/Server-side/Express_Nodejs/Introduction)
- [ExpressJS Doc on DevDocs](https://devdocs.io/express/)
