import GroupsApi from "../../main/api/GroupsApi";
import Group from "../../main/types/Group";
import Instance from "../../main/types/Instance";

describe('Groups API', () => {
  describe('FindAll', () => {
    it('If there are no groups, returns an empty Array', () => {
      const groups: Group[] = [];
      const groupsApi = new GroupsApi(groups);

      const result = groupsApi.findAll();
      expect(result).toEqual([]);
    });
    it('If there is one group, returns an array with one element', () => {
      const groupName: String = 'groupName';
      const groups: Group[] = createWithOneGroup(groupName);
      const groupApi = new GroupsApi(groups);

      const result = groupApi.findAll();

      expect(result.length).toBe(1);
      expect(result[0].group).toBe(groupName);
      expect(result[0].instances).toBe(1);
    });
    it('If there are two groups and one has no instances, returns an array with one element', () => {
      const groupName: String = 'groupName';
      const groups: Group[] = createTwoGroupsOneWithoutInstances(groupName);
      const groupApi = new GroupsApi(groups);

      const result = groupApi.findAll();

      expect(result.length).toBe(1);
      expect(result[0].group).toBe(groupName);
      expect(result[0].instances).toBe(1);
    })
  });
});

function createWithOneGroup(groupName: String): Group[] {
  const instance: Instance = {
    id: 'aaa',
    group: groupName
  }
  const group: Group = {
    group: groupName,
    instances: [instance],
    createdAt: new Date(),
    updatedAt: new Date()
  }
  return [group];
}

function createTwoGroupsOneWithoutInstances(groupName: String): Group[] {
  const group2: Group = {
    group: 'otherGroup',
    instances: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
  return createWithOneGroup(groupName).concat([group2]);
}