## Document Retrieval RAG

This Monorepo includes the following packages/apps:

### Apps and Packages

- `server`: a [Express.js](https://expressjs.com/) app where the RAG logic is implemented
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd document-retrieval-rag
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd document-retrieval-rag
pnpm dev
```
