import { DanMedia } from "./entity/DanMedia";
import { createConnection, Connection } from "typeorm";
import { getRandomComment } from "./commentsList";

export const gramComment = (
  pic: string,
  connection: any,
  instaUsername: string,
  instaPassword: string
) => {
  console.log(`in the function`);
  var Client = require("instagram-private-api").V1;
  var device = new Client.Device(instaUsername);
  var storage = new Client.CookieFileStorage(
    __dirname + `/../cookies/${instaUsername}.json`
  );
  return new Promise(
    (resolve): any => {
      Client.Session.create(device, storage, instaUsername, instaPassword)
        .then(async (session: any) => {
          console.log(`in session`);
          return new Client.Request(session)
            .setMethod("POST")
            .setResource("comment", { id: pic })
            .generateUUID()
            .setData({
              media_id: pic,
              src: "profile",
              comment_text: getRandomComment()
            })
            .signPayload()
            .send()
            .then((data: any) => {
              return new Client.Comment(session, {});
            })
            .then(async (r: any) => {
              let reso = await connection
                .createQueryBuilder()
                .update(DanMedia)
                .set({ new: false })
                .where("mediaId = :mediaId", { mediaId: pic })
                .execute();
              console.log(reso);
              console.log("commented and changed to false");
            });
        })
        .catch(r => {
          challengeMe(r);
        });

      function challengeMe(error) {
        return Client.Web.Challenge.resolve(error, "phone")
          .then(function(challenge) {
            // challenge instanceof Client.Web.Challenge
            console.log(challenge.type);
            // can be phone or email
            // let's assume we got phone
            if (challenge.type !== "phone") return;
            //Let's check if we need to submit/change our phone number
            return challenge.phone("16479668071").then(function() {
              return challenge;
            });
          })
          .then(function(challenge) {
            // Ok we got to the next step, the response code expected by Instagram
            return challenge.code("123456");
          });
      }
    }
  );
};

const startEt = async () => {
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

  let accounts: any[] = [
    "nonbrainwashed",
    "helloagainboiz",
    "erikolsonnna",
    "crypto_is_king1",
    "iambotlad",
    "graysonnewtonerr",
    "augustgreen__",
    "simps00ns"
  ];

  setInterval(async function() {
    let danny = connection.getRepository(DanMedia);
    let recentPosts = await danny.find({
      select: ["mediaId", "new"],
      take: 10
    });
    recentPosts.map(r => {
      if (r.new == true) {
        console.log(`starting comment engine`);
        //comment
        accounts.map(account => {
          console.log(r.mediaId, account);
          gramComment(r.mediaId, connection, account, "jakeadelman");
        });
      } else {
        console.log(`not true`);
        return;
      }
    });
  }, 2000);
};

startEt();
