# dafisha

## Getting Started

### Start a MongoDB Server

```bash
mongod --dbpath storage/database --smallfiles
```


### Configure environment

```bash
cp .env.example .env
```


### Install dependencies and start a Node.js server

```bash
yarn && yarn server
```

### Build server for production

```sh
babel src/server -d build/server
NODE_ENV=production yarn build -p
NODE_ENV=production yarn start
```


## architecture

### Action types

https://github.com/acdlite/flux-standard-action

```
type: Required. A string or Symbol indicating the action type.
payload: Optional. Any value or object containing data related to the action.
error: Optional. A boolean that, when true, indicates that the payload is an Error object.
meta: Optional. Any value or object containing data that isn’t part of the payload.
meta.status
meta.namespace
```


### Store

```js
{
    ui: {
        events: {
            isFetching: false,
            items: [],

        }
    },
    models: {

    },

    // normalized models
    collections: {

    },
}
```
