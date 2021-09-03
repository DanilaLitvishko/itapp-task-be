import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from 'src/modules/common/dto/auth/login.dto';
import { SignUpDto } from 'src/modules/common/dto/auth/sign-up.dto';
import { AuthService } from 'src/modules/common/services/auth/auth.service';
import { AuthResponseDto } from 'src/modules/common/dto/auth/auth-response.dto';
import { TokenDto } from 'src/modules/common/dto/auth/token.dto';
import { ActivationDto } from 'src/modules/common/dto/auth/activation.dto';
import { ActivationLinkDto } from 'src/modules/common/dto/auth/activation-link.dto';
import { AuthUser } from 'src/guards/decorators/AuthUser.decorator';

const authRoute = 'auth';

@Controller(authRoute)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<AuthResponseDto | boolean> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('/checkToken')
  async checkToken(@Query() tokenDto: TokenDto): Promise<AuthResponseDto> {
    return this.authService.checkToken(tokenDto);
  }

  @Get('/activate')
  async activateAccount(
    @Query() activationDto: ActivationDto,
  ): Promise<boolean> {
    return this.authService.activateAccount(activationDto);
  }

  @Get('/sendActivationLink')
  async sendActivationLink(
    @Query() activationLinkDto: ActivationLinkDto,
  ): Promise<boolean> {
    return this.authService.sendActivationLink(activationLinkDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  async logout(@AuthUser() user): Promise<boolean> {
    return this.authService.logout(user);
  }
}
