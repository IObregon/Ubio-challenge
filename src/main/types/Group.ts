import Instance from "./Instance";

export default interface Group {
  group: String;
  instances: Instance[];
  createdAt: Date;
  updatedAt: Date;
}