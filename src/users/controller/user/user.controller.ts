import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from 'src/post/dtos/CreatePost';
import { CreateUserDto } from 'src/users/dtos/CreateUserDto.dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfileDto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUserDto';
import { UserService } from 'src/users/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Post(':id/profile')
  async updateProfile(
    @Body() body: UpdateProfileDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    if (id) {
      return await this.userService.updateProfile(id, body);
    } else {
      throw new HttpException('Can not found ID', HttpStatus.NOT_FOUND);
    }
  }

  @Post(':id/post')
  createPost(
    @Body() body: CreatePostDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    this.userService.createPost(id, body);
  }
}
