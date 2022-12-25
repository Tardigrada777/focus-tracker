export abstract class UseCase<T, P> {
  execute(params: P): Promise<T> {
    throw new Error(`Method execute is not implemented ${params}`)
  }
}
