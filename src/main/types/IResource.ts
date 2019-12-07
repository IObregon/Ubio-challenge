export default interface IResource<T> {
  create(data: T): T;
}