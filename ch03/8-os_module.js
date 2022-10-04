const os = require("os");

const user = os.userInfo();
console.log(user);

console.log(`The System Uptime is ${os.uptime()} seconds`);

const currentOs = {
  name: os.type(),
  release: os.release(),
  totalMam: os.totalmem(),
  freeMam: os.freemem(),
}
console.log(currentOs);