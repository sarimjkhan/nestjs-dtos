## Description
The project is built using nestjs-cli, the project contains following files

```bash
##Payloads:
payloads/offer1.payload.ts
payloads/offer2.payload.ts

##Offer Entity:
src/offer/entities/offer.entity.ts

##DTOs:
src/offer/dtos/payload-one.dto.ts
src/offer/dtos/payload-two.dto.ts

##PayloadHandlers:
src/offer/handlers/payload-one.handler.ts
src/offer/handlers/payload-one.handler.spec.ts (Test File)
src/offer/handlers/payload-two.handler.ts
src/offer/handlers/payload-two.handler.spec.ts (Test File)

##Service:
src/offer/offer.service.ts
src/offer/offer.service.spec.ts (Test File)

##Controller:
src/offer/offer.controller.ts

```

## Installation

```bash
$ npm install
```

## Starting the app

```bash
# development
$ npm run start
```

## Calling the endpoint

```bash
# The project contains the following endpoint, please run it through postman or insomnia or any browser
localhost:3000/offer

# It will return an array of offers, currently we have two payloads in the project. One is valid and the other is not
```

## Test

```bash
# For now, the test files are added beside the original files. These are some simple 11 unit tests 

# to run the unit tests
$ npm run test

# to run tests with coverage
$ npm run test:cov
```

## Support
```bash
# This is a scalable solution, if you want to add support for more offer types,
# For example, if we want to add support for a third type of payload, we have to add three files
1) payload-three.dto.ts - this is used to convert the internal fields to the offer entity class object 
2) payload-three.handler.ts - this is used to map the payload fields to the internal fields of a dto
3) add the new payload handler class in the payloadHandlers array of offer.module.ts
4) In a nutshell, it is done by the extension and not the modification (SOLID)
```

## Author

- Author - Sarim Javaid Khan
