# Kill Team Companion

This project was made to provide tools for the Kill Team miniature wargame made by Games Workshop. Currently the site features a web app for creating a match room, where players can join and track the different points related to the match. The points can be modified by any player and the changes are updated in real time for each player. 

In the future, the site will feature other tools for managing different aspects of the game.

## Roadmap

- [x] Matchmaking and point manager
- [ ] Tac Ops (secondary objective) manager *(WIP)*
- [ ] Team Roster Manager *(WIP)*
- [ ] User accounts and stat tracking

*Due to this being a hobby project, the update schedule can be sporadic.*

# Dev Notes

The site is running on a React, Node and Postgres stack, which is fully containerized with Docker, and hosted on a VPS. The routing to different services is done through Nginx acting as a reverse proxy.

For the time being the site does not have a domain name, and is accessed directly through the VPS IP. The site has HTTPS enabled, but due to not having a domain name, the SSL certificate is self-signed. Because of this, browsers will throw warnings regarding it.

## Local Installation

The project containers are ran with Docker Compose. if you wish to run the development version locally, you can build and start it with the following command: 

```docker compose -f compose.yaml -f compose.dev.yaml up```

If you want to have the matchmaking functionality, you need to create the following table inside the Postgres container: 

```
 CREATE TABLE matches (
	match_id varchar(72) PRIMARY KEY,
	match_name varchar(50),
	mission_id int,
	active boolean,
	date date,
	player1_id varchar(72),
	player2_id varchar(72),
	player3_id varchar(72),
	player4_id varchar(72),
	player1_name varchar(50),	
	player2_name varchar(50),	
	player3_name varchar(50),	
	player4_name varchar(50),
	player1_cp int DEFAULT 4,
	player2_cp int DEFAULT 4,
	player3_cp int DEFAULT 4,
	player4_cp int DEFAULT 4,
	player1_vp int DEFAULT 0,
	player2_vp int DEFAULT 0,
	player3_vp int DEFAULT 0,
	player4_vp int DEFAULT 0,
	turning_point int,
	winner_id varchar(72),
	winnder_name varchar(72),
	draw boolean
);
```

Running the production version is not advised, as it will most likely refuse to build and work correctly.
