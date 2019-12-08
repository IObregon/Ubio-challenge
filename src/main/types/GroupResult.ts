import Group from "./Group";

export default class GroupResult {
  constructor(groupObject: Group){
    this.group = groupObject.group;
    this.instances = groupObject.instances.length;
    this.createdAt = groupObject.createdAt.getTime();
    this.lastUpdatedAt = groupObject.updatedAt.getTime();
  }
  public group: String;
  public instances: number;
  public createdAt: number;
  public lastUpdatedAt: number;
}