import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Db, Repository } from 'typeorm';

@Injectable()
export class IdentifyService {

    constructor(
        // 사용자 DB 접근
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async loginRequest(email: string, password: string) {
        const result = await this.userRepository.findOne(null, { where: { email: email }});
        //findOneOrFail({ where: { email: email, password: password }})
        console.log('login request:', result);
        // 계정이 없거나 비밀번호가 틀린 경우
        if ( !result || result.password !== password ) return false;
        return true; // 차후에 jwt 반환하도록 수정
    }

    async registerRequest() {
        const result = await this.userRepository.create({
            email: '',
            username: '',
            password: '',
            salt: '',
        }).save();
        console.log(result);

        return result;
    }
}