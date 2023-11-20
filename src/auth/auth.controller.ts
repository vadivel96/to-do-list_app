import { Controller, Get, Post, Body,Request, Patch, Param, Delete, UseGuards ,Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import{Response} from'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/getUser')
  getUser(){
   return this.authService.getUser();
  }
  
 
  @Post('/createUser')
  create(@Body() body:any) {
    return this.authService.register(body);
  } 

  @UseGuards(LocalAuthGuard)
  @Post('/loginUser')
  login(@Request() req:any) {
     return req.user;
  }

  @UseGuards(AuthGuard('RTjwt'))
  @Post('/refreshToken')
  refreshToken(@Request() req:any){
  return this.authService.refreshToken(req.user);
  }

  
}
