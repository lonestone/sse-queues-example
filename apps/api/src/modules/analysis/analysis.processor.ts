import { Processor, WorkerHost } from '@nestjs/bullmq'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Job } from 'bullmq'
import { ANALYSIS_UPDATED_EVENT } from './analysis-events.service'
import { ANALYSIS_STEPS, AnalysisJobData } from './analysis.contract'

export const ANALYSIS_QUEUE_NAME = 'analysis_queue'
export const ANALYSIS_JOB_NAME = 'analysis_job'
export const ANALYSIS_JOBS_CONCURRENCY = 10

@Processor(ANALYSIS_QUEUE_NAME, {
  concurrency: ANALYSIS_JOBS_CONCURRENCY,
  removeOnComplete: {
    age: 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 24 * 3600,
  },
})
export class AnalysisProcessor extends WorkerHost {
  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) {
    super()
  }

  async process(job: Job<AnalysisJobData>) {
    this.eventEmitter.emit(ANALYSIS_UPDATED_EVENT, { id: job.data.analysisId, step: ANALYSIS_STEPS.EXTRACTION })

    await new Promise(resolve => setTimeout(resolve, 4000))

    this.eventEmitter.emit(ANALYSIS_UPDATED_EVENT, { id: job.data.analysisId, step: ANALYSIS_STEPS.ANALYSIS_PART_ONE })

    await new Promise(resolve => setTimeout(resolve, 4000))

    this.eventEmitter.emit(ANALYSIS_UPDATED_EVENT, { id: job.data.analysisId, step: ANALYSIS_STEPS.ANALYSIS_PART_TWO })

    await new Promise(resolve => setTimeout(resolve, 2000))

    this.eventEmitter.emit(ANALYSIS_UPDATED_EVENT, { id: job.data.analysisId, step: ANALYSIS_STEPS.COMPLETED })
  }
}
