import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventsService.findOne(+id);
  // }
  @Get(':username')
  findByUsername(@Param('username') name: string) {
    return this.eventsService.findByEventName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }

  @Post(':eventId/buy-ticket/:email')
  async buyTicket(
    @Param('email') email: string,
    @Param('eventId') eventId: number,
  ): Promise<void> {
    await this.eventsService.buyTicket(email, eventId);
  }

  @Get('user/:email/tickets')
  async getTicketsByEmail(@Param('email') email: string): Promise<Event[]> {
    return await this.eventsService.getEventsByUser(email);
  }
}
