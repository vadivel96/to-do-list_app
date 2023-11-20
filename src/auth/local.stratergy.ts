import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
    
  }
  
  async validate(email: string, password: string): Promise<any> {
   try {
    const user= await this.authService.login({email, password});
   
    if (typeof user!="object") {
      
      throw new UnauthorizedException(user);
    }
    return user;
  }
    catch (error) {
      throw  error;
   }
}


}

