import { OwlFactory } from "../..";
import { OwlRouter, TypeOwlRouter, OwlRoute } from "extras";

class TestRouter implements OwlRoute {
  public path: string = "/";
  public router: TypeOwlRouter = OwlRouter();

  constructor() {
    this.Route();
  }

  private Route() {
    this.router.get("/", (req, res) => {
      res.send("you have reached this route");
    });

    this.router.post("/", (req, res) => {
      const body = req.body;
      console.log(body);
      res.status(200).json({ data: body });
    });
  }
}

const server = new OwlFactory(
  [new TestRouter()],
  "development",
  process.env.PORT || 9000,
  {
    url: "mongodb://root:password123@localhost:6000",
    options: {},
  }
);

server.listen();
