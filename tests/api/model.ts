import { IOwlMongooseD, MongooseSchema } from "extras";
import { model } from "mongoose";

export interface ITest extends IOwlMongooseD {
  name: string;
  age: number;
  country: string;
  createdAt: Date;
}

const schema = new MongooseSchema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
    },
    age: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      default: "Nigeria",
    },
  },
  {
    timestamps: true,
  }
);

const testModel = model<ITest>("test-db", schema);
export default testModel;
