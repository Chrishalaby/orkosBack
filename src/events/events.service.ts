import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
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
    const event = this.eventsRepository.findOne({ where: { id } });
    return this.eventsRepository.save({ ...event, ...updateEventDto });
  }

  async remove(id: number) {
    const event = await this.eventsRepository.findOne({ where: { id } });
    return this.eventsRepository.remove(event);
  }

  async buyTicket(email: string, eventId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
      relations: ['users'],
    });

    if (!user || !event) {
      throw new Error('User or event not found');
    }

    event.users.push(user);
    await this.eventsRepository.save(event);
  }

  async getEventsByUser(email: string): Promise<Event[]> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['events'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.events;
  }
}
