import {IFocusSessionRepository, repositories, StartFocusSessionParams} from '.'
import {container} from '../../container'
import {UseCase} from './use-case'
import {differenceInMinutes} from 'date-fns'

export class StartFocusSession extends UseCase<void, StartFocusSessionParams> {
  async execute(params: StartFocusSessionParams): Promise<void> {
    const repository = container.resolve<IFocusSessionRepository>(repositories.FocusSessionRepository)
    // TODO: log error if any sesssion already exists
    const existedSession = await repository.checkFocusSession(params.activity, params.area)
    if (existedSession === null) {
      await repository.storeFocusSession(params.activity, params.area)
    } else {
      const minutes = differenceInMinutes(new Date(), new Date(existedSession.start))
      await repository.logFocusSession(params.activity, params.area, minutes)
      await repository.cleanFocusSession(params.activity, params.area)
    }
  }
}
