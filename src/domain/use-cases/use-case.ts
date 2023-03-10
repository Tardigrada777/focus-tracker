export interface IUseCase<T, P> {
  execute(params: P): Promise<T>
}

export abstract class UseCase<T, P> implements IUseCase<T, P> {
  execute(params: P): Promise<T> {
    throw new Error(`Method execute is not implemented ${params}`)
  }
}
