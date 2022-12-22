# Owl.Js

Designing the application for a large express.js application is usually stressful and a lot of work and that's why I decided to build owl.js so as to reduce this stress and wasted time thereby letting developers focus on implementing functionalities and let owl.js handle stuffs like: error handling, imports e.t.c

<strong> requirement </strong>: node > version 14.0, npm or yarn

<hr/>

## Installation

- with npm

```bash
npm install owl-js
```

- with yarn

```bash
yarn add owl-js
```

## Dependencies

- express
- http-status
- moment
- morgan
- winston

--

- eslint
- eslint-config-airbnb-base
- eslint-config-prettier
- eslint-plugin-import
- eslint-plugin-prettier
- lint-staged
- prettier
- ts-node
- typescript
- @types/express
- @types/node
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser

## TEST

to run a manual server test run

```bash
yarn test:serve
```

or

```bash
npm run test:serve
```

or

```bash
pnpm test:serve
```

You can also view the tests/api/server.ts file to view the test code..
