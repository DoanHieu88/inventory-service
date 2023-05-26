import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactService } from './contact.service';
import { ContactRepository } from 'src/repository/contact.repository';
import { AppContactController, ContactController } from './contact.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ContactRepository]),
  ],
  controllers: [ContactController, AppContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
