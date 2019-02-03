export const instaComment = (
  instaUsername: string,
  instaPassword: string,
  mediaNumber: number,
  commentText: string
) => {
  var Client = require("instagram-private-api").V1;
  var device = new Client.Device(instaUsername);
  var storage = new Client.CookieFileStorage(
    __dirname + `/cookies/${instaUsername}.json`
  );
  return new Promise(
    (resolve, reject): any => {
      Client.Session.create(device, storage, instaUsername, instaPassword)
        .then(function(session) {
          return [session, Client.Account.searchForUser(session, "danlok")];
        })
        .spread(function(session, account) {
          var feed = new Client.Feed.UserMedia(session, account.id);
          var getty = feed.get();
          return [session, getty];
        })
        .spread((session, results) => {
          // results.map(r => console.log(r));
          return [session, results[mediaNumber].id];
        })
        .spread((session, res) => {
          return new Client.Request(session)
            .setMethod("POST")
            .setResource("comment", { id: res })
            .generateUUID()
            .setData({
              media_id: res,
              src: "profile",
              comment_text: commentText
            })
            .signPayload()
            .send()
            .then((data: any) => {
              return new Client.Comment(session, {});
            });
        })
        .then((result: any) => {
          if (result) {
            console.log(">> comment success");
            resolve(true);
          } else {
            console.log(">> comment failure");
            reject(false);
          }
        });
    }
  );
};

instaComment(
  "nonbrainwashed",
  "jakeadelman",
  0,
  "dan sells courses. but what he really sells is hopium"
).then(r => console.log(r));
