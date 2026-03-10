import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Queue } from 'bullmq'
import { ANALYSIS_UPDATED_EVENT } from './analysis-events.service'
import { ANALYSIS_STEPS } from './analysis.contract'
import { ANALYSIS_JOB_NAME, ANALYSIS_QUEUE_NAME } from './analysis.processor'

@Injectable()
export class AnalysisService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectQueue(ANALYSIS_QUEUE_NAME) private readonly analysisQueue: Queue,
  ) {}

  async startAnalyze(id: string) {
    this.eventEmitter.emit(ANALYSIS_UPDATED_EVENT, {
      id,
      step: ANALYSIS_STEPS.EXTRACTION,
    })
    this.analysisQueue.add(ANALYSIS_JOB_NAME, { id })
  }
}
