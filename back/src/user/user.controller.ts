import { Controller, Post, Body, Get, UnauthorizedException, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() body: { username: string; password: string }) {
    return this.userService.register(body.username, body.password);
  }

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const success = this.userService.login(body.username, body.password);
    if (success) {
      return { success: true };
    } else {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('username/:username')
  getByUsername(@Param('username') username: string) {
    const user = this.userService.getByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user;
  }
}
