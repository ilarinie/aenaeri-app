import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app/app";
import { initializeDB } from "./db";
import { createUser } from "./db/createUser";
import { UserEntity } from "./db/entities/User";
import { todaysGames } from "./db/queries/nextGames";
import logger from "./logger";
import { OddsServices } from "./services/OddsService";

const PORT = process.env.PORT || 3001;

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI || "");
}


console.log("fas");

app.listen(PORT, () => {
  logger.info("Aenaeri-app backend started, listening to port 3001");
});

// initializeDB()
//   .then(async () => {
//     // Start periodically updating odds
//     if (process.env.DEV_USER_NAME) {
//       try {
//         await createUser(process.env.DEV_USER_NAME, "password123");
//       } catch (err) {
//         logger.error(`Could not create dev user ${err}`);
//       }
//       setInterval(() => {
//         logger.info("Fetching todays games and odds");
//         UserEntity.findOneOrFail({ username: process.env.DEV_USER_NAME }).then(
//           (user) => {
//             todaysGames().then(async (games) => {
//               for (let i = 0; i < OddsServices.length; i++) {
//                 await OddsServices[i].addOddsForGames(games, user);
//               }
//             });
//           }
//         );
//       }, 1000 * 60 * 10);
//       logger.info("Updating todays odds..");
//       UserEntity.findOneOrFail({ username: process.env.DEV_USER_NAME }).then(
//         (user) => {
//           todaysGames().then(async (games) => {
//             for (let i = 0; i < OddsServices.length; i++) {
//               await OddsServices[i].addOddsForGames(games, user);
//             }
//           });
//         }
//       );
//     }
//   })
//   .catch((err) => {
//     logger.error(`Database connection startup failed ${err}`);
//   })
//   .finally(() => {
//     console.log("huihui");
//     app.listen(PORT, () => {
//       logger.info("Aenaeri-app backend started, listening to port 3001");
//     });
//   });

const init = async () => {
    console.log('asdas12d')
    try {
        await initializeDB();
    } catch (err) {
        logger.error('PostgreSQL connection failed')
        return;
    }
    console.log('123123')

  try {
    // Start periodically updating odds
    if (process.env.DEV_USER_NAME) {
      try {
        await createUser(process.env.DEV_USER_NAME, "password123");
      } catch (err) {
        logger.error(`Could not create dev user ${err}`);
      }
      setInterval(() => {
        logger.info("Fetching todays games and odds");
        UserEntity.findOneOrFail({ username: process.env.DEV_USER_NAME }).then(
          (user) => {
            todaysGames().then(async (games) => {
              for (let i = 0; i < OddsServices.length; i++) {
                await OddsServices[i].addOddsForGames(games, user);
              }
            });
          }
        );
      }, 1000 * 60 * 10);
      logger.info("Updating todays odds..");
      UserEntity.findOneOrFail({ username: process.env.DEV_USER_NAME }).then(
        (user) => {
          todaysGames().then(async (games) => {
            for (let i = 0; i < OddsServices.length; i++) {
              await OddsServices[i].addOddsForGames(games, user);
            }
          });
        }
      );
    }
  } catch (err) {
    logger.error(`Database connection startup failed ${err}`);
  }
};

init();