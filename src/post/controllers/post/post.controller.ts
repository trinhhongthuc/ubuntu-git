import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from 'src/post/dtos/CreatePost';
import { PostService } from 'src/post/services/post/post.service';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Post()
  createPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }
}
