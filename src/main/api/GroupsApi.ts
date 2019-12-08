import Group from "../types/Group"
import Instance from "../types/Instance";
import GroupResult from "../types/GroupResult";

export default class GroupsApi {
  private groups: Group[];
  constructor(groups: Group[]) {
    this.groups = groups;
  }

  findAll(): GroupResult[] {
    return this.groups
      .filter(group => group.instances.length > 0)
      .map(group => new GroupResult(group));
  }

}