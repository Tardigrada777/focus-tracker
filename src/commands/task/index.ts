import {Command} from '@oclif/core'
import {container} from '../../container'
import {StartFocusSession} from '../../domain/use-cases/log-focus-session'
import * as inquirer from 'inquirer'
import {activities, areas} from '../../config'

export default class Task extends Command {
  async run(): Promise<void> {
    const startFocusSessionUseCase = container.resolve<StartFocusSession>(StartFocusSession.token)
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
