import {IGetCurrentSessionRepository, repositories, StoredFocusSession} from '.'
import {container} from '../../container'
import {UseCase} from './use-case'

export class GetCurrentSession extends UseCase<StoredFocusSession | null, Record<string, never>> {
  async execute(_: Record<string, never>): Promise<StoredFocusSession | null> {
    const repository = container.resolve<IGetCurrentSessionRepository>(repositories.GetCurrentSession)
    return repository.getCurrentSession()
  }
}
