import Group from "../types/Group"
import GroupResult from "../types/GroupResult";
import InstanceResult from "../types/InstanceResult";

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

  findOne(groupName: String): InstanceResult[] {
    const group = this.groups.find(group => group.group === groupName)
    if (group) {
      return group.instances
        .map(instance => new InstanceResult(instance));
    }
    return [];
  }
}