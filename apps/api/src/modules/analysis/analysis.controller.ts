import { TypedController, TypedParam, TypedRoute } from '@lonestone/nzoth/server'
import { HttpCode, HttpStatus, Sse } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import z from 'zod'
import { AnalysisEventsService } from './analysis-events.service'
import { AnalysisService } from './analysis.service'

@TypedController('analysis')
export class AnalysisController {
  constructor(
    private readonly analysisEvents: AnalysisEventsService,
    private readonly analysisService: AnalysisService,
  ) {
  }

  @TypedRoute.Post('/:id/analyze')
  @HttpCode(HttpStatus.OK)
  async startAnalyze(@TypedParam('id', z.string()) id: string) {
    return this.analysisService.startAnalyze(id)
  }

  @ApiResponse({
    status: 200,
    description: 'SSE stream of analysis',
    content: {
      'text/event-stream': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  @Sse('events')
  getEvents() {
    return this.analysisEvents.onUpdated()
  }
}
