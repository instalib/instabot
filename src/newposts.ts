import { DanMedia } from "./entity/DanMedia";
import { createConnection, Connection } from "typeorm";
const chalk = require("chalk");
export const fetchDan = (
  connection: Connection,
  instaUser: string,
  instaUsername: string,
  instaPassword: string
) => {
  var Client = require("instagram-private-api").V1;
  var device = new Client.Device(instaUsername);
  var storage = new Client.CookieFileStorage(
    __dirname + `/../cookies/${instaUsername}.json`
  );
  return new Promise(
    (resolve): any => {
      Client.Session.create(device, storage, instaUsername, instaPassword)
        .then(function(session: any) {
          return [session, Client.Account.searchForUser(session, instaUser)];
        })
        .spread(async function(session, account) {
          var feed = new Client.Feed.UserMedia(session, account.id);
          var getty = feed.get();

          return [connection, session, getty];
        })
        .spread((connection: Connection, session, results) => {
          // results.map(async (res: any) => {
          // for (let i = 0; i < 4; i++) {
          let res = results[0];
          let id = res.id;
          // console.log(res.comments, "THIS RES");
          let comments = new Client.Feed.MediaComments(session, id);
          comments.get().then(r => console.log(r));
          // console.log(res._params, "THIS Params");
          // let commentCount = res._params.commentCount;
          // if (commentCount && commentCount > 0) {
          //   const danlokRepository = connection.getRepository(DanMedia);
          //   let reso = danlokRepository.find({ where: { mediaId: res.id } });
          //   reso.then(async (r: any) => {
          //     if (typeof r[0] == "undefined") {
          //       console.log(
          //         chalk.bold.green(`+1`) +
          //           chalk.green(` adding post for ${instaUser}, ${i} post`)
          //       );
          //       let danny = new DanMedia();
          //       danny.mediaId = res.id;
          //       danny.new = true;
          //       let currTime = new Date();
          //       danny.time = currTime.toString();
          //       await danlokRepository.save(danny);
          //     } else {
          //       console.log(
          //         chalk.red(`>> found post for ${instaUser}. not adding`)
          //       );
          //       return;
          //     }
          //   });
          // } else {
          //   return;
          // }
          // }
          // });
          // setTimeout(function() {
          //   connection.close();
          //   console.log("closed connection");
          // }, 10000);
          resolve(true);
        });
    }
  );
};

const startMain = async () => {
  const user = "momo_52_mo";
  const pass = "jakeadelman";
  const connection = await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "manx",
    password: "jakeadelman",
    database: "danlok",
    entities: [__dirname + "/entity/*.*"]
  });
  let userList = ["incomesecrets"];
  setInterval(function() {
    userList.map(instaUser => {
      fetchDan(connection, instaUser, user, pass);
    });
  }, 6000);
};

startMain();
