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
        .then((r: any) => resolve(true));
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
    "internet3marketer",
    "jason_massi82",
    "marketingonlineforeducated",
    "misterappleseed_",
    // "randommanzoo3o23",
    "augustgreen__"
  ];

  //   internet3marketer
  // jason_massi82
  // marketingonlineforeducated
  // misterappleseed_

  // randommanzoo3o23
  // momo_52_mo

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
  }, 20000);
};

startEt();
