## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```



## solution


const fs = require('fs');

function editcontent(content) {
  let arr = content.split(' ');
  let newContent = "";
  for(let i=0; i<arr.length; i++) {
    // console.log(arr[i] + i);
    if(arr[i] != '') {
      if(newContent == "") {
        newContent = arr[i];
      } else {
        newContent = newContent + " " + arr[i];
      }
    }
  }
  // newContent.trimStart();
  return newContent;
}
  fs.readFile('a.txt', 'utf8', (err,data) => {
      let content = data;
      let ans = editcontent(content);
      fs.writeFile('a.txt', ans, (err) =>{
        if(err) {
          console.log(err);
        } else {
          console.log("File edited successfully");
        }
      })
      // console.log(ans);
  });
