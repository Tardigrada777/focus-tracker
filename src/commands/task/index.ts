import {Command} from '@oclif/core'
import {container} from '../../container'
import {StartFocusSession} from '../../domain/use-cases/log-focus-session'
import {parseArgUtil} from '../../utils'

export default class Task extends Command {
  static args = [
    {name: 'area', required: true},
    {name: 'activity', required: true},
  ]

  async run(): Promise<void> {
    const {args} = await this.parse(Task)
    const startFocusSessionUseCase = container.resolve<StartFocusSession>(StartFocusSession.token)
    const parseArg = container.resolve<parseArgUtil>('parseArg')
    const {value: activity} = parseArg(args.activity)
    const {value: area} = parseArg(args.area)
    await startFocusSessionUseCase.execute({activity, area})
  }
}
