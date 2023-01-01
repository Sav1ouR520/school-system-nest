import { unlink } from 'fs';
import { join } from 'path';

export const RemoveFile = (oldIcon: string) => {
  const path = join(__dirname, '../../' + oldIcon);
  unlink(path, (error) =>
    error ? console.log(error) : console.log('remove success'),
  );
};
