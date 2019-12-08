export default interface IResource<T, T2> {
  create(data: T): T2;
  delete(data: T): void;
}