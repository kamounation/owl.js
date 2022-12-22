import { OwlFactory } from "../..";

import TestRoute from "./routes";

const mongoConfig = {
  url: "mongodb://root:password123@localhost:6000",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    dbName: "test",
  },
};

const server = new OwlFactory(
  [new TestRoute()],
  "development",
  process.env.PORT || 9000,
  mongoConfig
);

server.listen();
