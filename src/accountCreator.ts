import { DanMedia } from "./entity/DanMedia";
import { createConnection, Connection } from "typeorm";
// const { V1: Client, Device } = require("../../dist");

export const createUser = async () => {
  console.log(`in the function`);
  var Client = require("instagram-private-api").V1;
  var device = new Client.Device("okokok32");
  var storage = new Client.CookieFileStorage(
    __dirname + `/../cookies/okokok32.json`
  );
  let session = new Client.Session(device, storage);
  session.setProxy("http://178.128.31.153:8080");
  console.log("here");
  new Client.AccountEmailCreator(session)
    .setEmail("dsf3@iambotlad.33mail.com")
    .setUsername("hidan5342")
    .setPassword("jakeadelman")
    .setName("hi dan2")
    .register()
    .spread(function(account, discover) {
      // account instanceof Client.Accoun
      console.log("Created Account", account);
      console.log("Discovery Feed", discover);
    });
  //   let session = new Client.session(device, storage);
  //   const creator = new Client.AccountCreator(session, "email");
  //   creator.checkUsername("helli").then(json => {
  //     console.log(json);
  //   });
  //   return new Promise(
  //     (resolve): any => {
  //       Client.Session.create(device, storage, instaUsername, instaPassword)
  //         .then(async (session: any) => {
  //           console.log(`in session`);
  //           return new Client.Request(session)
  //             .setMethod("POST")
  //             .setResource("comment", { id: pic })
  //             .generateUUID()
  //             .setData({
  //               media_id: pic,
  //               src: "profile",
  //               comment_text: getRandomComment()
  //             })
  //             .signPayload()
  //             .send()
  //             .then((data: any) => {
  //               return new Client.Comment(session, {});
  //             })
  //             .then(async (r: any) => {
  //               let reso = await connection
  //                 .createQueryBuilder()
  //                 .update(DanMedia)
  //                 .set({ new: false })
  //                 .where("mediaId = :mediaId", { mediaId: pic })
  //                 .execute();
  //               console.log(reso);
  //               console.log("commented and changed to false");
  //             });
  //         })
  //         .then((r: any) => resolve(true));
  //     }
  //   );
};
createUser();
// const startEt = async () => {
//   const connection = await createConnection({
//     name: "conny",
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "manx",
//     password: "jakeadelman",
//     database: "danlok",
//     entities: [__dirname + "/entity/*.*"]
//   });

//   let accounts: any[] = [
//     "nonbrainwashed",
//     "helloagainboiz",
//     "erikolsonnna",
//     "crypto_is_king1",
//     "iambotlad",
//     "graysonnewtonerr"
//   ];

//   setInterval(async function() {
//     let danny = connection.getRepository(DanMedia);
//     let recentPosts = await danny.find({
//       select: ["mediaId", "new"],
//       take: 10
//     });
//     recentPosts.map(r => {
//       if (r.new == true) {
//         console.log(`starting comment engine`);
//         //comment
//         accounts.map(account => {
//           console.log(r.mediaId, account);
//           gramComment(r.mediaId, connection, account, "jakeadelman");
//         });
//       } else {
//         console.log(`not true`);
//         return;
//       }
//     });
//   }, 20000);
// };

// startEt();
