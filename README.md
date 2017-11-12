This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


# Readable - Udacity assignment built with React

## Example-server

There is an example-server added that can be used, and is provided here for you. For more information about the server, head over to [Readable API server on github](https://github.com/udacity/reactnd-project-readable-starter).

## Getting up and running

Please use `yarn` instead of `npm`, as one of the dependencies has a missing `package.json` in root, and `npm` does not handle this appropriatly.

### With provided example-server

```bash
yarn install
yarn start
```

This will install everything needed, and also run the server alongside the webapplicaiton itself.

### With your own server

```bash
yarn install
yarn run start-front
```

This will launch the webapplicaiton only, and will listen for a server-api at port 3001 by default.


### Build for production

```bash
yarn run build
```
