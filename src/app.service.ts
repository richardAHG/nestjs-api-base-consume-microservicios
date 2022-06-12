import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user-event';
import { CreateUserRequestDto } from './create-user-request.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('COMUNICACION')
    private readonly _microserviceComunicacion: ClientProxy,
    @Inject('ANALISIS') private readonly _microserviceAnalisis: ClientProxy,
  ) {}
  private readonly users: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserDto: CreateUserRequestDto) {
    this.users.push(createUserDto);
    this._microserviceComunicacion.emit(
      'user_created',
      new CreateUserEvent(createUserDto.email),
    );
    this._microserviceAnalisis.emit(
      'user_created',
      new CreateUserEvent(createUserDto.email),
    );
  }

  getAnalisis() {
    return this._microserviceAnalisis.send({ cmd: 'get_analitycs' }, {});
  }
}
