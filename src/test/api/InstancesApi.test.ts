import InstanceApi from "../../main/api/InstancesApi";
import Group from "../../main/types/Group";
import Instance from "../../main/types/Instance";
describe('Instances API', () => {
  describe('Create', () => {
    it('If there is no group created, it is creates with the same createdAt and updateAt', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      const group = 'particle-detector';
      const instance: Instance = {
        id: 'ID',
        group
      }

      const result = instanceApi.create(instance);
      expect(groups.length).toBe(1);
      expect(groups[0].group).toEqual(group);
      expect(groups[0].createdAt).toEqual(result.createdAt);
      expect(groups[0].updatedAt).toEqual(result.updatedAt);
    });

    it('If the group is already created, it added the new Instance to it and updates the updatedAt field', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      const group = 'particle-detector';
      const prevResult = insertOneInstance(group, instanceApi);

      const newInstance: Instance = {
        group,
        id: 'DifferentID'
      }
      const result = instanceApi.create(newInstance);

      expect(groups.length).toBe(1);
      expect(groups[0].instances.length).toBe(2);
      expect(groups[0].createdAt).toEqual(prevResult.createdAt);
      expect(groups[0].updatedAt).not.toEqual(prevResult.createdAt);
    });
    it('If the group and the instance already exists, updates both updateAt', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      const group = 'particle-detector';
      const prevResult = insertOneInstance(group, instanceApi);

      const newInstance: Instance = {
        group,
        id: 'ID'
      }
      const result = instanceApi.create(newInstance);

      expect(groups.length).toBe(1);
      expect(groups[0].instances.length).toBe(1);
      expect(groups[0].createdAt).toEqual(prevResult.createdAt);
      expect(groups[0].updatedAt).not.toEqual(prevResult.createdAt);
      expect(groups[0].instances[0].updatedAt).toEqual(result.updatedAt);
      expect(groups[0].instances[0].createdAt).toEqual(prevResult.createdAt);
    });
    it('If there was already meta data it is merged.', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      const group = 'particle-detector';
      const metaData1 = { foo: 1, asd: 'aaa' }
      const metaData2 = { aaa: 2, qqw: true }
      const id = 'ID'
      insertOneInstance(group, instanceApi, id, metaData1);
      const instance2: Instance = {
        group,
        id,
        meta: metaData2
      };

      const result = instanceApi.create(instance2);

      expect(groups[0].instances[0].meta).toEqual({ ...metaData1, ...instance2.meta });
      expect(result.meta).toEqual({ ...metaData1, ...instance2.meta });
    })
  });
  describe('Delete', () => {
    it('If the group and the instance exist, is deleted and updatedAt field updated', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      const group = 'particle-detector';
      const id = 'id'
      const yesterday: Date = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
      insertOneInstance(group, instanceApi, id, {}, yesterday);
      instanceApi.delete({ id, group });

      expect(groups.length).toBe(1);
      expect(groups[0].instances.length).toBe(0);
      console.log(groups[0].updatedAt);
      console.log(yesterday);
      expect(groups[0].updatedAt).not.toEqual(yesterday);
    });

    it('If the group does not exist, does nothing', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      const group = 'particle-detector';
      const id = 'id'
      insertOneInstance(group, instanceApi, id);
      instanceApi.delete({ id, group: 'differentGroup' });

      expect(groups.length).toBe(1);
      expect(groups[0].instances.length).toBe(1);
    });

    it('If the instance does not exist, does nothing', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      const group = 'particle-detector';
      const id = 'id'
      insertOneInstance(group, instanceApi, id);
      instanceApi.delete({ id: 'differentId', group });

      expect(groups.length).toBe(1);
      expect(groups[0].instances.length).toBe(1);
    })
  })
});

function insertOneInstance(group: string,
  instanceApi: InstanceApi,
  id: string = 'ID',
  meta: any = {},
  yesterday: Date = (d => new Date(d.setDate(d.getDate() - 1)))(new Date)) {
  const instance: Instance = {
    group,
    id,
    createdAt: yesterday,
    meta
  };
  const prevResult = instanceApi.create(instance);
  return prevResult;
}
