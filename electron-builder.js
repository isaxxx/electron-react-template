const builder = require('electron-builder');
const fs = require('fs');
const packagejson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const Platform = builder.Platform;

builder.build({
  targets: Platform.MAC.createTarget(),
  config: {
    'appId': `com.example.${packagejson.name}`,
  },
}).then(() => {

}).catch((error) => {
  
});
