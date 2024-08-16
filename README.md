# AWS Cart service

## Description

Nest application deployed to AWS Elastic Beanstalk. Docker is used for as platform.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker containerization locally

```bash
# compose up
$ docker compose up

# compose down
$ docker compose down
```

## Elastic Beanstalk

```bash
# init eb app
$ eb init

# create environment
$ eb create --cname <name-of-environment> --single

# terminate environment
$ aws elasticbeanstalk terminate-environment --environment-name <name-of-environment>

# destroy eb app
$ eb terminate --all
```