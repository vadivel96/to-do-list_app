import { Injectable ,Res, UnauthorizedException} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import {Response} from'express';

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
        const payload={  username: user.firstName, email:user.email };
        const accessToken=await this.jwt.signAsync(payload,{secret:process.env.secret,expiresIn:'1m'});
        const refreshToken=await this.jwt.signAsync(payload,{secret:process.env.secret,expiresIn:'2d'});
        user.refToken=refreshToken;
       const newUser= await this.userService.createUser(user);
       
       return {
        accessToken ,
        refreshToken,
   };
     }
     else{
      return "already user exists!!"
     }
     
  }

  async login(user:any):Promise<any>{
     let {email,password}=user;
     const existingUser=await this.userService.findByEmail(email);
     if(existingUser ){
      const passwordMatch=await bcrypt.compare(password,existingUser.password);
        if(passwordMatch){
          const payload = { id: existingUser.id , username: existingUser.firstName, email:existingUser.email };
          const accessToken=await this.jwt.signAsync(payload,{secret:process.env.secret,expiresIn:'1m'});
          const refreshToken=await this.jwt.signAsync(payload,{secret:process.env.secret,expiresIn:'2d'});
          await this.userService.updateById(payload.id,{refToken:refreshToken})
        return {
         accessToken,
         refreshToken,
         id:existingUser.id
    };
        }else{
          throw new UnauthorizedException("password incorrect");
        } 
     }else{
      throw new UnauthorizedException("user not exist !!!") 
     }
  }

  async refreshToken(User:any){
    const user=await this.userService.findById(User.id);
    const oldRefreshToken=User.refreshToken.split(' ')[1];
    const dbStoredToken=user.refToken;
    if(oldRefreshToken===dbStoredToken){
      const newRefreshToken=await this.jwt.signAsync({id:User.id,email:User.email,userName:User.firstName},
        {secret:process.env.secret,expiresIn:'2d'});
        
      const newAccessToken=await this.jwt.signAsync({id:User.id,email:User.email,userName:User.firstName},
        {secret:process.env.secret,expiresIn:'1m'});
      await this.userService.updateById(User.id,{refToken:newRefreshToken});
    
      return{
        newAccessToken,
        newRefreshToken
      }

    }else{
     return "token doesnt match"
    }
    
    
    
     
    

  }

}
