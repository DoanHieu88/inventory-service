import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { FileUploadDto, querySeach, UpdatePathTemp } from './file-manager.dto';
import {
  editFileName,
  FileFilter,
  toResponseFiles,
} from 'src/common/until/file-util';
import { Response } from 'express';
import fs from 'fs';
import { FileManagerService } from './file-manager.service';
import pathLib from 'path';
import { IMAGE, STATIC_FOLDER } from 'src/common/constant/validate-constant';
// import { TransformInterceptor } from 'src/common/interceptors/transformer-interceptor';
import { diskStorage } from 'multer';
@ApiTags('api/File Manager')
@Controller('api/file-manager')
export class FileManagerController {
  constructor(private fileManagerService: FileManagerService) {}

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: `./${STATIC_FOLDER}/${IMAGE}`,
        filename: editFileName,
      }),
      fileFilter: FileFilter,
    }),
    // TransformInterceptor,
  )
  @ApiConsumes('/multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: FileUploadDto,
  })
  uploadImageTemplate(@UploadedFiles() files: Array<Express.Multer.File>) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        filename: file.filename,
        minetype: file.mimetype,
      };
      response.push(fileReponse);
    });
    return toResponseFiles(files);
  }

  // @Post('multiple-upload')
  // @UseInterceptors(
  //   FilesInterceptor('files[]', 20, {
  //     storage: diskStorage({
  //       destination: `./${STATIC_FOLDER}/${IMAGE}`,
  //       filename: editFileName,
  //     }),
  //   }),
  //   TransformInterceptor,
  // )
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'Upload file',
  //   type: FileUploadDto,
  // })
  // uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   const response = [];
  //   files.forEach((file) => {
  //     const fileReponse = {
  //       filename: file.filename,
  //       minetype: file.mimetype,
  //     };
  //     response.push(fileReponse);
  //   });
  //   return toResponseFiles(files);
  // }

  // @Post('upload-video')
  // @UseInterceptors(
  //   AnyFilesInterceptor({
  //     storage: diskStorage({
  //       destination: `./${STATIC_FOLDER}/${VIDEO}`,
  //       filename: editFileName,
  //     }),
  //     fileFilter: FileFilterVideo,
  //   }),
  //   TransformInterceptor,
  // )
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'Upload file',
  //   type: FileUploadDto,
  // })
  // uploadVideoTemplate(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   const response = [];
  //   files.forEach((file) => {
  //     const fileReponse = {
  //       filename: file.filename,
  //       minetype: file.mimetype,
  //     };
  //     response.push(fileReponse);
  //   });
  //   return toResponseFiles(files);
  // }

  // @Post('upload/contact')
  // @UseInterceptors(
  //   AnyFilesInterceptor({
  //     storage: diskStorage({
  //       destination: `./${STATIC_FOLDER}/${CONTACT}`,
  //       filename: editFileName,
  //     }),
  //     fileFilter: FileContact,
  //   }),
  //   TransformInterceptor,
  // )
  // @ApiConsumes('/multipart/form-data')
  // @ApiBody({
  //   description: 'Upload file',
  //   type: FileUploadDto,
  // })
  // uploadContactFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   const response = [];
  //   console.log("files", files)
  //   files.forEach((file) => {
  //     const fileReponse = {
  //       filename: file.filename,
  //       minetype: file.mimetype,
  //     };
  //     response.push(fileReponse);
  //   });
  //   return toResponseFiles(files);
  // }
}
