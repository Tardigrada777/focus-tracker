/* eslint-disable camelcase */
import * as dotenv from 'dotenv'
dotenv.config()

import {IFocusSessionRepository, StoredFocusSession} from '../domain/use-cases'
import {notion} from '../notion'
import {JsonStorage} from './storage'

const {DATABASE_ID = ''} = process.env

export class FocusSessionRepository implements IFocusSessionRepository {
  private _storage = new JsonStorage()

  async cleanFocusSession(activity: string, area: string): Promise<void> {
    const sessions = await this._storage.loadSessions()
    await this._storage.writeSessions(
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
    const sessions = await this._storage.loadSessions()
    const existedSession = sessions.find(s => s.activity === activity && s.area === area && s.end === null)
    return existedSession ?? null
  }

  async storeFocusSession(activity: string, area: string): Promise<boolean> {
    const sessions = await this._storage.loadSessions()
    sessions.push({
      activity,
      area,
      start: new Date().toISOString(),
      end: null,
    })
    await this._storage.writeSessions(sessions)
    return true
  }
}
