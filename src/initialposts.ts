import { DanMedia } from "./entity/DanMedia";
import { createConnection } from "typeorm";
export const fetchDan = (instaUsername: string, instaPassword: string) => {
  var Client = require("instagram-private-api").V1;
  var device = new Client.Device(instaUsername);
  var storage = new Client.CookieFileStorage(
    __dirname + `/../cookies/${instaUsername}.json`
  );
  return new Promise(
    (resolve): any => {
      Client.Session.create(device, storage, instaUsername, instaPassword)
        .then(function(session) {
          return [session, Client.Account.searchForUser(session, "danlok")];
        })
        .spread(async function(session, account) {
          var feed = new Client.Feed.UserMedia(session, account.id);
          var getty = feed.get();
          const connection = await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "manx",
            password: "jakeadelman",
            database: "danlok",
            entities: [__dirname + "/entity/*.*"]
          });
          return [connection, session, getty];
        })
        .spread((connection, session, results) => {
          results.map(async (res: any) => {
            let commentCount = res._params.commentCount;
            if (commentCount && commentCount > 0) {
              const danlokRepository = connection.getRepository(DanMedia);
              let reso = danlokRepository.find({ where: { mediaId: res.id } });
              reso.then(async (r: any) => {
                if (typeof r[0] == "undefined") {
                  console.log("type is undefined..adding");
                  let danny = new DanMedia();
                  danny.mediaId = res.id;
                  danny.new = false;
                  await danlokRepository.save(danny);
                } else {
                  console.log("found tweet");
                  return;
                }
              });
            } else {
              return;
            }
          });
          setTimeout(function() {
            connection.close();
            console.log("closed connection");
          }, 10000);
          resolve(true);
        });
    }
  );
};

setInterval(function() {
  fetchDan("nonbrainwashed", "jakeadelman");
}, 20000);
