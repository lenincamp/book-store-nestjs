import { MapperService } from './mapper.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MapperService],
  exports: [MapperService]
})
export class SharedModule { }
