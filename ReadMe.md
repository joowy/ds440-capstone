# Drowsiness.TV

Drowsiness.TV is a browser extension for people who sleep to movies or TV shows. This extension aims to automatically pause movies or TV shows when user is falling asleep. 

## Requirements
This extension is built using the following: 

- Python v3.8
- pip v22.2
- Node.js v16.13
- yarn v1.22
- Visual Studio C++ 2017

## Installation

### Front-end

```bash
# change directory into client folder
ds440-capstone/$ cd client

# install dependencies
ds440-capstone/client$ yarn install 

# build extension for Chrome 
ds440-capstone/client$ yarn run build:chrome
```
Building the extension will enable loading extension into browser.

Load unpacked extension folder from ds440-capstone/client/extension/chrome. For how to load unpacked extension see: https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked


### Back-end
Change directory into server folder
```bash
# change directory into server folder
ds440-capstone/$ cd server

# install dependencies for node and python
ds440-capstone/sever$ yarn install 
ds440-capstone/sever$ pip install -r requirements.txt 

# Run backend server
ds440-capstone/sever$ node app.js
```


## Usage


