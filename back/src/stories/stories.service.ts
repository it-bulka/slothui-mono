import { Injectable } from '@nestjs/common';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepo: Repository<Story>,
  ) {}

  async findStory(id: string) {
    return await this.storyRepo.findOne({ where: { id } });
  }
}
