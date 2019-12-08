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
  describe('FindAll', () => {
    it('If there are not instances, returns an empty array', () => {
      const groupName: String = 'groupName';
      const groups: Group[] = createOneGroupWithoutInstances(groupName);
      const groupsApi = new GroupsApi(groups);

      const result = groupsApi.findOne(groupName);
      expect(result).toEqual([]);
    });
    it('If there is one instance, returns an array with one element', () => {
      const groupName: String = 'groupName';
      const groups: Group[] = createWithOneGroup(groupName);
      const groupsApi = new GroupsApi(groups);

      const result = groupsApi.findOne(groupName);
      expect(result.length).toBe(1);
      expect(result[0].group).toEqual(groupName);
    });
    it('If the group does not exist, returns empty array', () => {
      const groupName: String = 'groupName';
      const groups: Group[] = createWithOneGroup(groupName);
      const groupsApi = new GroupsApi(groups);

      const result = groupsApi.findOne('otherGroupName');
      expect(result.length).toBe(0);
    });
  });
});
function createOneGroupWithoutInstances(groupName: String): Group[] {
  const group = createWithOneGroup(groupName);
  group[0].instances = []
  return group;
}

function createWithOneGroup(groupName: String): Group[] {
  const instance: Instance = {
    id: 'aaa',
    group: groupName,
    createdAt: new Date(),
    updatedAt: new Date()
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