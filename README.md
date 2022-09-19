# Auth graphql Api 

## Requirements

Make sure you have installed docker and docker compose.

## Running the app

Firstly, run the docker container. Make sure you are in this directory and run

```bash
$ docker-compose up -d
```

or, if docker is not accessed as sudo mode:

```bash
$ sudo docker-compose up -d
```
Finnaly, run the migartion and the app by running:
```bash
# quick-start
$ npm run quick-start
```
If you have already the migrations are up-to-date, just run

```bash
# quick-start
$ npm run start
```

## Usage
To access the api, go to [http://localhost:8080/graphql](http://localhost:8080/graphql) to get into playground.

There are two mutations that can be accessed.

#### Register new user
```
mutation {
    registerUser(email:{your_email}, password: {your_password}{
        id
    }
}
```

#### Login user

```
mutation {
    loginUser(email:{your_email}, password: {your_password}{
        token
    }
}
```

#### Other requests

This token given in the login has to be written for the auth. Go to HTTP Headers,
and type:

```
{
    "Authorization":"Bearer {your_token}"
}
```

Note: This token expires after an hour, so if there is an access error make sure
to login again.

Finally, see the schema in the right-hand side, to see all the different queries and mutations you can access.