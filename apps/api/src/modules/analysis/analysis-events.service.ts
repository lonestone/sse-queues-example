import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Subject } from 'rxjs'
import { AnalysisEvent } from './analysis.contract'

export const ANALYSIS_UPDATED_EVENT = 'analysis-updated-event'

export const ANALYSIS_STEPS = [
  'processing',
  'extraction',
  'analysis-part-one',
  'analysis-part-two',
  'completed',
  'failed',
]

@Injectable()
export class AnalysisEventsService implements OnModuleDestroy {
  private readonly eventSubject = new Subject<MessageEvent>()

  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.eventEmitter.on(ANALYSIS_UPDATED_EVENT, (event: AnalysisEvent) => {
      if (event.step && ANALYSIS_STEPS.includes(event.step as typeof ANALYSIS_STEPS[number])) {
        this.eventSubject.next({ data: event } as MessageEvent)
      }
    })
  }

  onUpdated() {
    return this.eventSubject.asObservable()
  }

  onModuleDestroy() {
    this.eventSubject.complete()
  }
}
