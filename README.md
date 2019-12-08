# Backend Developer Challenge

## Instalation
1. ```git clone repository```
2. ```cd to the repository```
3. ```npm install```
4. ```npm run build```
5. ```npm run start [MAX_AGE_IN_MINUTES] [INTERVAL_TIME_IN_MINUTES] [PORT]```
   1. ```MAX_AGE_IN_MINUTE: If the last communication with one Instance is bigger than this it would be deleted. Defaults to 60```
   2. ```INTERVAL_TIME_IN_MINUTES: Number of minutes the background task wait before executing again```
   3. ```PORT: In what port will the API start listening to. Some ports require ROOT privileges```
6. ```MAX_AGE_IN_MINUTE=1 INTERVAL_TIME_IN_MINUTES=2 PORT=8080 npm run start```
   1. This will start the API on PORT 8080. The background task will be executed every 2 minutes and would delete all the Instances that are older than 1 minute.

## Endpoints

### ```POST /:group/:id```
  1. Creates a new Group ```:group``` if it does not exist, or update if it does.
  2. Creates a new Instance ```:id``` if it does not exist, or update if it does.

### ```DELETE /:group/:id```
1. Deletes an Instance ```:id``` from a Group ```:group```.
2. Returns ```204``` with no content.

### ```GET /```
1. Returns a JSON array containing a summary of all currently registered groups as follows:

```json
[
    {
        "group": "particle-detector",
        "instances": 4, // the number of registered instances in this group
        "createdAt": 1571418124127, // the timestamp of the first heartbeat registered in this group
        "lastUpdatedAt": 1571418124127, // the timestamp of the last heartbeat registerd in this group
    },
    // ...
]
```
2. Groups containing 0 instances are not returned.

### ```GET /:group```
1. Returns a JSON array describing instances of the ```:group```:
   
```json
   [
    {
        "id": "e335175a-eace-4a74-b99c-c6466b6afadd",
        "group": "particle-detector",
        "createdAt": 1571418096158,
        "updatedAt": 1571418124127,
        "meta": {
            "foo": 1
        },
    },
    // ...
    ]
```

### Background task
1. It is executed every [```INTERVAL_TIME_IN_MINUTES``` env variable (defaults to 60 minutes)] minutes and deletes the Instances that are older than [```MAX_AGE_IN_MINUTE``` env variable(defaults 60 minutes)].