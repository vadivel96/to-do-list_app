import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private userService:UserService, private jwt:JwtService){}

  async hashPassword(password:string):Promise<String>{
    let salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
  }
  async getUser(){
    return this.userService.getUser();
  }

  async register(user:CreateUserDto):Promise<any>
  {
      let {email,password}=user
      const existingUser=await this.userService.findByEmail(email);
      if(!existingUser){
        const hashedpassword=await this.hashPassword(password);
        user.password=hashedpassword;
       return this.userService.createUser(user);
     }
     else{
      return "already user exists!!"
     }
     
  }

  async login(user:any):Promise<any>{
     let {email,password}=user;
     const existingUser=await this.userService.findByEmail(email);
     const passwordMatch=await bcrypt.compare(password,existingUser.password);
     if(existingUser ){
        if(passwordMatch){
          const payload = { id: existingUser.id , username: existingUser.firstName, email:existingUser.email };
        return {
         access_token: await this.jwt.signAsync(payload),
    };
        }else{
          return "password incorrect"
        } 
     }else{
      return "user not exist !!!"
     }
  }


}
