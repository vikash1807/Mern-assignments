## Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

## solution

function currentTime() {
  console.clear();
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  console.log(`${hours} : ${minutes} : ${seconds}`);
  setTimeout(currentTime, 1000); 
}
currentTime();





































































(Hint: setTimeout)