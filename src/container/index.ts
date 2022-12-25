import {createContainer, InjectionMode, asClass, asFunction} from 'awilix'
import {repositories} from '../domain/use-cases'

import {StartFocusSession} from '../domain/use-cases/log-focus-session'
import {FocusSessionRepository} from '../repositories/focus-session'
import {parseArg} from '../utils'

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
})

container.register({
  [StartFocusSession.token]: asClass(StartFocusSession),
})

container.register({
  [repositories.FocusSessionRepository]: asClass(FocusSessionRepository),
})

container.register({
  [parseArg.name]: asFunction(() => parseArg),
})

export {container}
