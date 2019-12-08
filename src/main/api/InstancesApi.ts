import IResource from "../types/IResource";
import Group from "../types/Group"
import Instance from "../types/Instance";
import InstanceResult from "../types/InstanceResult";


export default class InstncesApi implements IResource<Instance, InstanceResult> {
  private groups: Group[];

  constructor(groups: Group[]) {
    this.groups = groups;
  }

  create(data: Instance): InstanceResult {
    let newInstance: Instance = {
      ...data,
      createdAt: data.createdAt || new Date(),
      updatedAt: data.createdAt || new Date()
    }
    const group = this.groups.find(group => group.group === newInstance.group);
    if (group) {
      newInstance = this.updateGroup(group, newInstance);
    } else {
      this.createNewGroup(newInstance);
    }
    return new InstanceResult(newInstance);
  }

  delete(data: Instance): void {
    const group = this.groups.find(group => group.group === data.group);
    if (group) {
      this.deleteInstance(group, data.id);
      group.updatedAt = new Date();
    }
  }

  private deleteInstance(group: Group, id: String) {
    group.instances = group.instances.filter(instance => instance.id !== id);
  }

  private updateGroup(group: Group, newInstance: Instance): Instance {
    group.updatedAt = newInstance.createdAt;
    const instance = group.instances.find(instance => instance.id === newInstance.id);
    if (instance) {
      instance.updatedAt = new Date();
      instance.meta = { ...instance.meta, ...newInstance.meta }
    } else {
      group.instances.push(newInstance);
    }
    return instance || newInstance;
  }
  private createNewGroup(newInstance: Instance): void {
    const newGroup: Group = {
      group: newInstance.group,
      createdAt: newInstance.createdAt,
      updatedAt: newInstance.updatedAt,
      instances: [newInstance]
    }
    this.groups.push(newGroup);
  }
}