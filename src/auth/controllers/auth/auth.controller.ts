import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserLoginDto } from 'src/auth/dtos/UserLogin';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { UserService } from 'src/users/services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(UserService) private userService: UserService
  ) {}

  @Post('/login')
  userLogin(@Body() body: UserLoginDto) {
    this.userService.getUser();
    return this.authService.userLogin(body);
  }
}
