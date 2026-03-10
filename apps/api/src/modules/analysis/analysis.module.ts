import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { AnalysisEventsService } from './analysis-events.service'
import { AnalysisController } from './analysis.controller'
import { ANALYSIS_QUEUE_NAME, AnalysisProcessor } from './analysis.processor'
import { AnalysisService } from './analysis.service'

@Module({
  imports: [
    BullModule.registerQueue({ name: ANALYSIS_QUEUE_NAME }),
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService, AnalysisEventsService, AnalysisProcessor],
})
export class AnalysisModule {}
