import InstanceApi from "../../main/api/InstancesApi";
import Group from "../../main/types/Group";
import Instance from "../../main/types/Instance";
describe('Instances API', () => {
  describe('Create', () => {
    it('If there is no group created, it is creates with the same createdAt and updateAt', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      const group = "particle-detector";
      const instance: Instance = {
        id: "ID",
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
      let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
      const group = "particle-detector";
      const instance: Instance = {
        group,
        id: "ID",
        createdAt: yesterday
      }
      const newInstance: Instance = {
        group,
        id: "DifferentID"
      }
      const prevResult = instanceApi.create(instance);

      const result = instanceApi.create(newInstance);

      expect(groups.length).toBe(1);
      expect(groups[0].instances.length).toBe(2);
      expect(groups[0].createdAt).toEqual(prevResult.createdAt);
      expect(groups[0].updatedAt).not.toEqual(prevResult.createdAt);
    });
    it('If the group and the instance already exists, updates both updateAt', () => {
      const groups: Group[] = [];
      const instanceApi = new InstanceApi(groups);
      let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
      const group = "particle-detector";
      const instance: Instance = {
        group,
        id: "ID",
        createdAt: yesterday
      }
      const newInstance: Instance = {
        group,
        id: "ID"
      }

      const prevResult = instanceApi.create(instance);
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
      const group = "particle-detector";
      const metaData1 = { foo: 1, asd: "aaa" }
      const metaData2 = { aaa: 2, qqw: true }
      const instance1: Instance = {
        group,
        id: "ID",
        meta: metaData1
      };
      const instance2: Instance = {
        group,
        id: "ID",
        meta: metaData2
      };
      instanceApi.create(instance1);

      const result = instanceApi.create(instance2);

      expect(groups[0].instances[0].meta).toEqual({ ...instance1.meta, ...instance2.meta });
      expect(result.meta).toEqual({ ...instance1.meta, ...instance2.meta });
    })
  });
});