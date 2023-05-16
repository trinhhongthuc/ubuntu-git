import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { CreatePostDetailParams } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}
  async createPost(createPostDetail: CreatePostDetailParams) {
    const newPost = await this.postRepository.create(createPostDetail);

    return await this.postRepository.save(newPost);
  }
}
