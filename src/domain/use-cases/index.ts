export interface StoredFocusSession {
  activity: string;
  area: string;
  start: string;
  end: string | null;
}

export interface IFocusSessionRepository {
  storeFocusSession(activity: string, area: string): Promise<boolean>
  checkFocusSession(activity: string, area: string): Promise<StoredFocusSession | null>
  logFocusSession(activity:string, area: string, minutes: number): Promise<void>
  cleanFocusSession(activity: string, area: string): Promise<void>
}

export const repositories = {
  FocusSessionRepository: 'FocusSessionRepository',
}
