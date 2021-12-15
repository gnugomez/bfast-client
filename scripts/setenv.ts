const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPaths = [
  `./src/environments/environment.prod.ts`,
  `./src/environments/environment.ts`,
];
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   API_URL: "${process.env.API_URL}",
   OAUTH_CLIENT: "${process.env.OAUTH_CLIENT}",
	 OAUTH_SECRET: "${process.env.OAUTH_SECRET}",
};
`;
// write the content to the respective file
targetPaths.forEach((path) => {
  writeFile(
    path,
    environmentFileContent,
    { recursive: true },
    function (err: any) {
      if (err) {
        
      }
      
    }
  );
});
