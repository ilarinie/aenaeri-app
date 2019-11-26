SELECT "teamId", pts, name FROM team_single_season_stats_entity
    RIGHT JOIN team_entity
        ON "teamId" = team_entity.id
WHERE team_entity.confrence = 'Western'
ORDER BY pts DESC;


SELECT "teamId" FROM team_single_season_stats_entity
ORDER BY pts DESC;


SELECT "playerId" FROM skater_single_season_stats_entity    ORDER BY points DESC LIMIT 100;

SELECT "playerId", player_entity."fullName" FROM skater_single_season_stats_entity LEFT JOIN player_entity
        ON "playerId" = player_entity.id WHERE  nationality = 'FIN'  ORDER BY points DESC LIMIT 100;

SELECT "playerId", player_entity."fullName", points, assists, ppg FROM skater_single_season_stats_entity LEFT JOIN player_entity
ON "playerId" = player_entity.id WHERE nationality = 'FIN' ORDER BY points DESC LIMIT 100;

SELECT avg(assists) FROM skater_single_season_stats_entity WHERE season='20192020' AND games > (SELECT avg(games) FROM skater_single_season_stats_entity) - 10;  ;