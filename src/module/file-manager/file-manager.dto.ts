import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

export class ImagePathDto {
  @ApiProperty()
  path: string;
}


export class UpdatePathTemp {
  @ApiProperty()
  path: any;
}
export enum typePath {
  date = 'date',
}

export class querySeach {
  @ApiProperty({enum: typePath,required:false})
  path: typePath;
}