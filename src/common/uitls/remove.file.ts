import { unlink } from 'fs';
import { join } from 'path';

export const RemoveFile = (file: string) => {
  const path = join(__dirname, '../../' + file);
  unlink(path, (error) =>
    error ? console.log(error) : console.log('remove success'),
  );
};
