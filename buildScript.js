const fs = require("fs");
const fse = require("fs-extra");
const childProcess = require("child_process");

if (fs.existsSync("./build")) {
  fse.removeSync("./build");
}

if (fs.existsSync("./dist")) {
  fse.removeSync("./dist");
}

childProcess.execSync("vite build", { stdio: "inherit" });
childProcess.execSync("tsc -p server/tsconfig.json", { stdio: "inherit" });


fse.moveSync("./build", "./dist/app/public", { overwrite: true });
