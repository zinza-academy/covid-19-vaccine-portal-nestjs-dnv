import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../auth/decorators/user.decorator';
import { Role } from '../auth/enums/role.enum';
import { IUser } from '../auth/interfaces';
import { UpdateUserDto } from './dto/user-update.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.Admin)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number, @User() user: IUser) {
    return this.usersService.findOne(id, user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser,
  ) {
    return this.usersService.updateOne(id, updateUserDto, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteOne(id);
  }
}
