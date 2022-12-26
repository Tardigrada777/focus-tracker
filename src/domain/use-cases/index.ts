import {IUseCase} from './use-case'

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

export interface IGetCurrentSessionRepository {
  getCurrentSession(): Promise<StoredFocusSession | null>
}

export const repositories = {
  FocusSessionRepository: 'FocusSessionRepository',
  GetCurrentSession: 'GetCurrentSessionRepository',
}

export interface StartFocusSessionParams {
  activity: string;
  area: string;
}

export type IStartFocusSession = IUseCase<void, StartFocusSessionParams>

export type IGetCurrentSession = IUseCase<StoredFocusSession | null, Record<string, never>>
