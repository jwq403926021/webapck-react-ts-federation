const fs = require('fs');
const deleteFolderSync = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`${folderPath} has been removed`);
  } else {
    console.log(`${folderPath} does not exist`);
  }
};
const workspace = ['common', 'host', 'micro-app1']
function main() {
  workspace.forEach(i => {
    deleteFolderSync(`./${i}/dist/`)
    deleteFolderSync(`./${i}/node_modules/.federation`)
  })
}
main();
