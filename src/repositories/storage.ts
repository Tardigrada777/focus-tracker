import {readFile, writeFile} from 'node:fs/promises'
import {StoredFocusSession} from '../domain/use-cases'

export class JsonStorage {
  async loadSessions(): Promise<StoredFocusSession[]> {
    const sessionsData = await readFile('sessions.json', {encoding: 'utf-8'})
    const sessions = JSON.parse(sessionsData)
    return sessions
  }

  async writeSessions(sessions: StoredFocusSession[]): Promise<void> {
    await writeFile('sessions.json', JSON.stringify(sessions, null, 2), {encoding: 'utf-8'})
  }
}
