import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {Request} from'express';


@Injectable()
export class RTStrategy extends PassportStrategy(Strategy,'RTjwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:process.env.secret,
      passReqToCallback:true
    });
  }

  async validate(req:Request,payload: any) {
    const refreshToken=req.get('authorization').replace('bearer','').trim();
    return {...payload,refreshToken};
  }
}