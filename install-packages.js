const { exec } = require('child_process');

// List of packages to install
const packages = [
  'axios',
  'redux',
  'react-router-dom',
  // Add other packages here
];

// Function to install a package
const installPackage = (pkg) => {
  exec(`npm install ${pkg}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing ${pkg}: ${error}`);
      return;
    }
    console.log(`Successfully installed ${pkg}`);
  });
};

// Install all packages
packages.forEach(installPackage);
