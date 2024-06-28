const { readFile, writeFile } = require('fs');

readFile('./content/first.txt', 'utf-8', (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});

writeFile('./temporary/fileB.txt', 'This is line 1\r\n', { flag: 'a' }, (err, result) => {
  if (err) {
    console.log(err);
  } else
    writeFile('./temporary/fileB.txt', 'This is line 2\r\n', { flag: 'a' }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        writeFile('./temporary/fileB.txt', 'This is line 3\r\n', { flag: 'a' }, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
});
