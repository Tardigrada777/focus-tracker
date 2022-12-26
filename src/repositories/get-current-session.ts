import {IGetCurrentSessionRepository, StoredFocusSession} from '../domain/use-cases'
import {JsonStorage} from './storage'

export class GetCurrentSessionRepository implements IGetCurrentSessionRepository {
  private _storage = new JsonStorage()

  async getCurrentSession(): Promise<StoredFocusSession | null> {
    const sessions = await this._storage.loadSessions()
    const [session] = sessions
    return session ?? null
  }
}
