import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from '../../services/profile/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Delete(':id')
  deleteProfile(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.profileService.deleteProfile(id);
  }
}
