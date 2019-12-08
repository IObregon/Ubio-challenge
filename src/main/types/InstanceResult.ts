import Instance from "./Instance";

export default class InstanceResult {
  constructor(instanceObject: Instance) {
    this.id = instanceObject.id;
    this.group = instanceObject.group;
    this.meta = instanceObject.meta;
    this.createdAt = instanceObject.createdAt ? instanceObject.createdAt.getTime() : new Date().getTime();
    this.updatedAt = instanceObject.updatedAt ? instanceObject.updatedAt.getTime() : new Date().getTime();
  }
  public id: String;
  public group: String
  public createdAt: number;
  public updatedAt: number;
  public meta?: any;
}