## Create a counter in JavaScript

We have already covered this in the second lesson, but as an easy recap try to code a counter in Javascript
It should go up as time goes by in intervals of 1 second

## solution

function currentTime() {
  console.clear();
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  console.log(`${hours} : ${minutes} : ${seconds}`); 
}
setInterval(currentTime, 1000);

