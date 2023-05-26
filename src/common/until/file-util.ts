import { Guid } from 'guid-typescript';

import { extname } from 'path';

export const imageRegex = /\.(jpg|jpeg|jfif|png|gif|svg|webp)$/;

export const videoRegex =
  /\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/;

export const editFileName = (
  _req: any,

  file: Express.Multer.File,

  callback: Function | undefined,
): void => {
  // const name = file.originalname.split('.')[0];

  const fileExtName = extname(file.originalname);

  const fileId = Guid.create().toString();

  callback && callback(null, `${fileId}-${Date.now()}${fileExtName}`);
};

export const FileFilter = (
  _req: any,

  file: Express.Multer.File,

  callback: Function | undefined,
): void | undefined => {
  console.log(file.originalname);

  if (
    // !file.originalname.match(imageRegex) &&

    // !file.originalname.match(pdfRegex)

    !file.originalname.match(imageRegex) &&
    !file.originalname.match(videoRegex)
  ) {
    return callback && callback(new Error('sai định dạng'));
  }

  callback && callback(null, true);
};

export const FileFilterVideo = (
  _req: any,

  file: Express.Multer.File,

  callback: Function | undefined,
): void | undefined => {
  console.log(file.originalname);

  if (
    // !file.originalname.match(imageRegex) &&

    // !file.originalname.match(pdfRegex)

    !file.originalname.match(videoRegex)
  ) {
    return callback && callback(new Error('sai định dạng'));
  }

  callback && callback(null, true);
};

export const FileContact = (
  _req: any,
  file: Express.Multer.File,
  callback: Function | undefined,
): void | undefined => {
  callback && callback(null, true);
};

export const toResponseFiles = (
  files: Array<Express.Multer.File>,
): Array<Partial<Express.Multer.File>> => {
  const response: Array<Partial<Express.Multer.File>> = [];

  files.forEach((file) => {
    const fileReponse = {
      filename: file.filename,

      minetype: file.mimetype,
    };

    response.push(fileReponse);
  });

  return response;
};
