import {createContainer, InjectionMode, asClass, asFunction} from 'awilix'

import {UseCases} from '../domain'
import {repositories} from '../domain/use-cases'
import {GetCurrentSession} from '../domain/use-cases/get-current-session'
import {StartFocusSession} from '../domain/use-cases/log-focus-session'

import {FocusSessionRepository} from '../repositories/focus-session'
import {GetCurrentSessionRepository} from '../repositories/get-current-session'

import {parseArg} from '../utils'

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
})

container.register({
  [UseCases.StartFocusSession]: asClass(StartFocusSession),
})

container.register({
  [UseCases.GetCurrentSession]: asClass(GetCurrentSession),
})

container.register({
  [repositories.FocusSessionRepository]: asClass(FocusSessionRepository),
})

container.register({
  [repositories.GetCurrentSession]: asClass(GetCurrentSessionRepository),
})

container.register({
  [parseArg.name]: asFunction(() => parseArg),
})

export {container}
