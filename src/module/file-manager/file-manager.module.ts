import { FileManagerService } from './file-manager.service';
import { FileManagerController } from './file-manager.controller';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    forwardRef(() => AuthModule),
  ],
  controllers: [FileManagerController],
  providers: [FileManagerService,],
})
export class FileManagerModule {}
