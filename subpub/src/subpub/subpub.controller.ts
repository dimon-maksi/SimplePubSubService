import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Res,
    HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { SubpubService } from './subpub.service';
import { ISubpubController } from './subpub.controller.interface';
import { IMessage, ITopic } from 'src/datasource/data/data.interface';

@Controller('topics')
export class SubpubController implements ISubpubController {
    constructor(private readonly subpubService: SubpubService) {}

    @Get(':topic/subscribe')
    async subscribe(
        @Param('topic') topic: string,
        @Res() res: Response
    ): Promise<void> {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        this.subpubService.subscribe(topic, res);
    }

    @Post(':topic/publish')
    @HttpCode(201)
    async publish(
        @Param('topic') topic: string,
        @Body() messageData: any
    ): Promise<void> {
        this.subpubService.publish(topic, messageData);
        return;
    }

    @Get()
    async getAllTopics(): Promise<ITopic[]> {
        return this.subpubService.getAllTopics();
    }

    @Get(':topic/messages')
    async getLastMessages(
        @Param('topic') topic: string,
        @Param('count') count: number
    ): Promise<IMessage[]> {
        return this.subpubService.getLastMessages(topic, count);
    }
}
