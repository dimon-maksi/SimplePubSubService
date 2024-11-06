import { Controller, Get, Post, Param, Body, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { SubpubService } from './subpub.service';
import { ISubpubController } from './subpub.controller.interface';

@Controller('topics')
export class SubpubController implements ISubpubController {
  constructor(private readonly subpubService: SubpubService) {}

  // Subscribe with SSE
  @Get(':topic/subscribe')
  async subscribe(@Param('topic') topic: string, @Res() res: Response): Promise<any> {
    // Set headers to keep connection open for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Call the service method to handle SSE subscriptions
    this.subpubService.subscribeToSSE(topic, res);

    // Return to keep the SSE connection open
    return;
  }

  // Unsubscribe HTTP endpoint
  @Post(':topic/unsubscribe')
  @HttpCode(200)
  async unsubscribe(@Param('topic') topic: string, @Body() subscriberData: any): Promise<any> {
    return this.subpubService.unsubscribe(topic, subscriberData);
  }

  // Publish a message to a topic
  @Post(':topic/publish')
  @HttpCode(201)
  async publish(@Param('topic') topic: string, @Body() messageData: any): Promise<any> {
    return this.subpubService.publishMessage(topic, messageData);
  }

  // Get all topics
  @Get()
  async getAllTopics(): Promise<any> {
    return this.subpubService.getAllTopics();
  }

  // Get last messages for a specific topic
  @Get(':topic/messages')
  async getLastMessages(@Param('topic') topic: string): Promise<any> {
    return this.subpubService.getLastMessages(topic);
  }
}
