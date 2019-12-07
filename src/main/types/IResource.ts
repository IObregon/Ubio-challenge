export default interface IResource<T> {
  create(data: T): T;
  delete(data: T): void;
}