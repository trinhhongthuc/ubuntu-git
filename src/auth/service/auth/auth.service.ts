import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/typeorm/entities/User';
import { IUserLogin } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwt: JwtService
  ) {}

  async userLogin(userLoginDetails: IUserLogin) {
    const user = await this.userRepository.findOneBy({
      userName: userLoginDetails.userName,
    });
    console.log(process.env.POST);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const comparePassword = await bcrypt.compare(
      userLoginDetails.password,
      user.password
    );

    if (!comparePassword)
      throw new HttpException(
        'User name or password incorrect',
        HttpStatus.BAD_REQUEST
      );

    const payload = { userName: user.userName, sub: user.id };

    const access_token = await this.jwt.signAsync(payload);

    return { ...user, access_token };
  }
}
