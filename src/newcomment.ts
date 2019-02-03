import { DanMedia } from "./entity/DanMedia";
import { createConnection } from "typeorm";
import { getRandomComment } from "./commentsList";

export const gramComment = (instaUsername: string, instaPassword: string) => {
  var Client = require("instagram-private-api").V1;
  var device = new Client.Device(instaUsername);
  var storage = new Client.CookieFileStorage(
    __dirname + `/../cookies/${instaUsername}.json`
  );
  return new Promise(
    (resolve): any => {
      Client.Session.create(device, storage, instaUsername, instaPassword)
        .then(async function(session) {
          const connection = await createConnection({
            name: "conny",
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "manx",
            password: "jakeadelman",
            database: "danlok",
            entities: [__dirname + "/entity/*.*"]
          });
          let danny = connection.getRepository(DanMedia);
          return [session, danny, connection];
        })
        .spread(async function(session, danny, connection) {
          let resos = danny.find({ select: ["mediaId", "new"], take: 10 });
          return [resos, session, connection];
        })
        .spread(async (r: any, session: any, connection: any) => {
          r.map(res => {
            if (res.new == true) {
              //   console.log(reso);
              console.log("was true");
              return new Client.Request(session)
                .setMethod("POST")
                .setResource("comment", { id: res.mediaId })
                .generateUUID()
                .setData({
                  media_id: res.mediaId,
                  src: "profile",
                  comment_text: getRandomComment()
                })
                .signPayload()
                .send()
                .then((data: any) => {
                  return new Client.Comment(session, {});
                })
                .then(async r => {
                  let reso = await connection
                    .createQueryBuilder()
                    .update(DanMedia)
                    .set({ new: false })
                    .where("mediaId = :mediaId", { mediaId: res.mediaId })
                    .execute();
                  console.log(reso);
                  console.log("commented and changed to false");
                });
            } else {
              console.log("was false");
            }
          });
        })
        .then((r: any) => resolve(true));
    }
  );
};

gramComment("nonbrainwashed", "jakeadelman");

let accounts = [
  { username: "nonbrainwashed", password: "jakeadelman" },
  { username: "helloagainboiz", password: "jakeadelman" }
];

setTimeout(function() {
  accounts.map(account => {
    gramComment(account.username, account.password);
  });
}, 100000);
