import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private eventsRepository: Repository<Event>) {}
  create(createEventDto: CreateEventDto) {
    const newEvent = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(newEvent);
  }

  findAll() {
    return this.eventsRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} event`;
  // }

  findByEventName(name: string) {
    return this.eventsRepository.findOne({
      where: { name },
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = this.eventsRepository.findOne({where: {id}});
    return this.eventsRepository.save({ ...event, ...updateEventDto });
  }

  async remove(id: number) {
    const event = await this.eventsRepository.findOne({where: {id}});
    return this.eventsRepository.remove(event);
  }
}
