import fs from 'fs';

export default async function() {
  return new Promise((resolve, reject) => {
    fs.unlink('db.sqlite', err => {
      if (err) reject(err);
      resolve();
    });
  });
}
