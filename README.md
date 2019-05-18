# Assignment 2 - ReactJS App & API.

Name: Steven Kouri

## Overview.
This project expands upon my ReactJS app to add tracking of players. The user may either type in a player's
name or click on a player's name in the contract listing to display more information about said player.
Since player's like to "kill" each other in game, I have added attributes helpful for tracking down other players.
Added were:

 + Alts: Alternate names the player may go by in game. Useful for spying or going incognito.
 + Last Seen: The location the player was last seen. This is user defined, rather than system generated as will be seen in the list below.
 + Bounty: How much the player is worth to "kill". Purely arbitrary and set by user, as the EVE Swagger API does not allow for retrieving the actual bounty as set by the system
 + Ship Types: The types of ships the player has been seen flying. Important to know so that the user won't bring a knife to a gun fight.
 + Locations: The locations the player has last been seen as determined by parsing contracts. If an item is for sale at a station, the user may or may not have been at that station recently. (It is possible to do remote selling.)

Features:

 + Uses a faster method of loading contracts in parallel in order to parse locations for a player.
 + Persists user's information mentioned above in a Mongo database so that it may be referred to later.

## Installation requirements.

Run "npm install" to download all the dependences.

## Data Model Design.

The data persisted to Mongo is fairly simple and appears as follows:

 + Character
 {
     "_id":"167237158",
     "__v":0,
     "alts":"Kortec Jr.",
     "bounty":"1000",
     "last_seen_location":"Poinen",
     "ship_types":"Moa"
 }

 + Contract
 [
     {
         "buyout":0,
         "contract_id":145360810,
         "date_expired":"2019-05-23T18:18:08Z",
         "date_issued":"2019-05-08T00:00:00Z",
         "days_to_complete":0,
         "end_location_id":60013867,
         "issuer_corporation_id":98592597,
         "issuer_id":167237158,
         "price":75000000,
         "reward":0,
         "start_location_id":60013867,
         "title":"",
         "type":"auction",
         "volume":711901.085,
         "info":
            {
                "end_location_name":"Podion VIII - Moon 15 - Nefantar Miner Association Mining Outpost",
                "issuer_name":"Kortec"
            }
     }
 ]

## UI Design.

A screenshot showing the contracts page with the new character search textbox.  

![][contracts]

A screenshot showing the new character page with new attributes and a table of locations.

![][characters]

## Web API Endpoint Reference

+ /api/location/:id - returns a listing of contract locations for a given character.
+ /api/character - returns a list of all characters stored in Mongo.
+ /api/character/:id - returns data for a specific character stored in Mongo.

All of the above are open and require no authentication.

## Web API Install and Operation

Run "npm start" to start up the system.

## API Design

| HTTP Verb & Path |  Description |
| -- | -- |
| **GET** /api/location{id} | Return a list of locations for a character. |
| **GET** /api/character | Return a list of all persisted characters in Mongo. |
| **GET** /api/character/{id} | Return a specific persisted characters in Mongo. |
| **POST** /api/character | Add a new character |
| **PUT** /api/character/{id} | Update a character |
| **DELETE** /api/character/{id} | Delete a character |

## API Configuration

~~~bash
NODE_ENV=development
PORT=8080
HOST=localhost
mongoDB=mongodb://localhost:27017/witesi_db
seedDb=true
secret=theCakeIsALie
~~~

## Security and Authentication
No security or authentication has been implemented currently.

## Testing

Run "npm run unit-test" to perform unit tests of the API.
Run "npm run test" to perform tests on the database calls to Mongo.

![][tests]

## Extra features

The original ReactJS app would load a listing of the contracts, as well as many other elements which would take a long time. I didn't want this to happen on the server side, so I re-implemented the method to retrieve contracts, but left out the unused elements. More importantly, I made most of the calls parallel in order to speed up the process. Also, I made use of the EVE Swagger API's paging methods in order to load ALL the data instead of just the first page.

https://developers.eveonline.com/blog/article/esi-concurrent-programming-and-pagination

## Independent learning.

In my assignment 1, I used the fetch method in order to retrieve the contracts. I also cached them to the brower's local data store. This store did not exist within Node, making it even more important for the calls to be quick. I first attempted to cache them server side, but eventually decided I wanted it to be as real time as possible, hence making the calls parallel. Using Axios helped with this.

[characters]: ./characters.png
[contracts]: ./contracts.png
[tests]: ./tests.png
