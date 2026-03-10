import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bullmq'
import { ANALYSIS_JOB_NAME, ANALYSIS_QUEUE_NAME } from './analysis.processor'

@Injectable()
export class AnalysisService {
  constructor(
    @InjectQueue(ANALYSIS_QUEUE_NAME) private readonly analysisQueue: Queue,
  ) {}

  async startAnalyze(id: string) {
    this.analysisQueue.add(ANALYSIS_JOB_NAME, { analysisId: id })
  }
}
