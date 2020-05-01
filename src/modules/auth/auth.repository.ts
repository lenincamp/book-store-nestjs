import { SignUpDto } from './dto/signup.dto';
import { UserDetails } from './../user/user-details.entity';
import { RoleType } from './../role/role-type.enum';
import { RoleRepository } from './../role/role.repository';
import { User } from './../user/user.entity';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto) {
    const { username, email, password } = signUpDto;
    const user = new User();
    user.username = username;
    user.email = email;

    const roleRepository: RoleRepository = await getConnection().getRepository(Role);

    const defaultRole: Role = await roleRepository.findOne({ where: { name: RoleType.GENERAL } });

    user.roles = [defaultRole];

    const details = new UserDetails();
    user.details = details;
    //Number de digits aleatory que se agra al hash al ini o al fin haciendo mas dificil decode...
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
  }
}