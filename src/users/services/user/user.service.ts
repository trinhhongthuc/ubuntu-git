import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SALT } from 'src/constants';
import { CreateUserDto } from 'src/dtos/user.dto';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreatePostDetailParams, IUpdateProfile, IUpdateUser } from 'src/utils';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  getUser() {
    return this.userRepository.find({ relations: ['posts', 'profile'] });
  }

  async createUser(userDetail: CreateUserDto) {
    const password = await bcrypt.hashSync(userDetail.password, SALT);

    const newUser = this.userRepository.create({
      ...userDetail,
      password: password,
      createAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetail: IUpdateUser) {
    return this.userRepository.update({ id }, { ...updateUserDetail });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async updateProfile(id: number, profileDetail: IUpdateProfile) {
    const user = await this.userRepository.findOneBy({ id });

    if (user) {
      const newProfile = this.profileRepository.create(profileDetail);

      const saveProfile = await this.profileRepository.save(newProfile);
      user.profile = saveProfile;

      await this.userRepository.save(user);

      return user;
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async createPost(id: number, postDetail: CreatePostDetailParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new HttpException('USer not found', HttpStatus.NOT_FOUND);

    const newPost = await this.postRepository.create(postDetail);

    await this.postRepository.save(newPost);

    user.posts = [newPost];

    return this.userRepository.save(user);
  }
}
