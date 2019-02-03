import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async connection => {
    console.log("updating database");
  })
  .catch(error => console.log(error));
