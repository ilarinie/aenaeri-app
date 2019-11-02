SELECT "teamId", pts, name FROM team_single_season_stats_entity
    RIGHT JOIN team_entity
        ON "teamId" = team_entity.id
WHERE team_entity.confrence = 'Western'
ORDER BY pts DESC;


SELECT "teamId" FROM team_single_season_stats_entity
ORDER BY pts DESC;


SELECT "playerId" FROM skater_single_season_stats_entity    ORDER BY points DESC LIMIT 100;

SELECT "playerId" FROM skater_single_season_stats_entity LEFT JOIN player_entity
        ON "playerId" = player_entity.id WHERE  nationality = 'FIN'  ORDER BY points DESC LIMIT 100;