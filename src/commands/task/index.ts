import {Command, Flags} from '@oclif/core'
import * as inquirer from 'inquirer'
import {container} from '../../container'
import {activities, areas} from '../../config'
import {UseCases} from '../../domain'
import {IGetCurrentSession, IStartFocusSession} from '../../domain/use-cases'

export default class Task extends Command {
  static flags = {
    finish: Flags.boolean({char: 'f'}),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Task)
    const startFocusSessionUseCase = container.resolve<IStartFocusSession>(UseCases.StartFocusSession)
    const getCurrentSessionUseCase = container.resolve<IGetCurrentSession>(UseCases.GetCurrentSession)

    if (flags.finish) {
      const currentSession = await getCurrentSessionUseCase.execute({})
      if (!currentSession) return
      const {activity, area} = currentSession
      await startFocusSessionUseCase.execute({activity, area})
      return
    }

    const {activity} = await inquirer.prompt([{
      name: 'activity',
      message: 'select an activity',
      type: 'list',
      choices: activities.map(a => ({name: a})),
    }])
    const {area} = await inquirer.prompt([{
      name: 'area',
      message: 'select an area',
      type: 'list',
      choices: areas.map(a => ({name: a})),
    }])

    await startFocusSessionUseCase.execute({activity, area})
  }
}
