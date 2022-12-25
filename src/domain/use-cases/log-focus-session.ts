import {IFocusSessionRepository, repositories} from '.'
import {container} from '../../container'
import {UseCase} from './use-case'
import {differenceInMinutes} from 'date-fns'

interface Params {
  activity: string;
  area: string;
}

export class StartFocusSession extends UseCase<void, Params> {
  static token = 'LogFocusSession'

  async execute(params: Params): Promise<void> {
    const repository = container.resolve<IFocusSessionRepository>(repositories.FocusSessionRepository)
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
