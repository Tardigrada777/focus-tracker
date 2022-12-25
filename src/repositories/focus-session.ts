/* eslint-disable camelcase */
import * as dotenv from 'dotenv'
dotenv.config()

import {readFile, writeFile} from 'node:fs/promises'
import {IFocusSessionRepository, StoredFocusSession} from '../domain/use-cases'
import {notion} from '../notion'

const {DATABASE_ID = ''} = process.env

export class FocusSessionRepository implements IFocusSessionRepository {
  async cleanFocusSession(activity: string, area: string): Promise<void> {
    const sessions = await this.loadSessions()
    await this.writeSessions(
      sessions.filter(s => s.activity !== activity && s.area !== area),
    )
  }

  async logFocusSession(activity: string, area: string, minutes: number): Promise<void> {
    await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: DATABASE_ID,
      },
      properties: {
        Task: {
          title: [
            {
              text: {
                content: `${activity} + ${area}`,
              },
            },
          ],
        },
        Activity: {
          select: {
            name: activity,
          },
        },
        Area: {
          select: {
            name: area,
          },
        },
        Minutes: {
          number: minutes,
        },
      },
    })
  }

  async checkFocusSession(activity: string, area: string): Promise<StoredFocusSession | null> {
    const sessions = await this.loadSessions()
    const existedSession = sessions.find(s => s.activity === activity && s.area === area && s.end === null)
    return existedSession ?? null
  }

  async storeFocusSession(activity: string, area: string): Promise<boolean> {
    const sessions = await this.loadSessions()
    sessions.push({
      activity,
      area,
      start: new Date().toISOString(),
      end: null,
    })
    await this.writeSessions(sessions)
    return true
  }

  private async loadSessions(): Promise<StoredFocusSession[]> {
    const sessionsData = await readFile('sessions.json', {encoding: 'utf-8'})
    const sessions = JSON.parse(sessionsData)
    return sessions
  }

  private async writeSessions(sessions: StoredFocusSession[]): Promise<void> {
    await writeFile('sessions.json', JSON.stringify(sessions, null, 2), {encoding: 'utf-8'})
  }
}
