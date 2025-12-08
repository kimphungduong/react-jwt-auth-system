import { Controller, Post, Get, Body, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.userService.register(body.email, body.password);
  }

  // Protected endpoint để lấy thông tin user hiện tại
  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getMe(@Req() req) {
    const user = await this.userService.findById(req.user.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user._id.toString(),
      email: user.email,
      createdAt: user.createdAt,
    };
  }
}