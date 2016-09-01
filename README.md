# Smart Meter Testing Management App

## What's this?
- A web app to manage smart meter testing process.
- Under development

## What's includ?
- the main app
- a websocket mock server named `ws.js`
- a pdf maker server named `nodeapi.js`,which has been integrated into `index.js` as well.

##What's it build with?
- AngularJS 1.5.x
- REST API backend
- lots of open source libs

## How to develop?

- Run `npm start` .

## How to test?

- Running `npm run test` .

## How to deploy?
- Run `npm run build&& npm run main` .

## Regarding API server forward 
- Development env: 
    - basically:
    `npm run serve`will run `grunt serve --host=0.0.0.0 --port=8000 --live=8001`

    - everything else has been defined in `Gruntfile.js`.        for instance:
        - To specify `API server`,run `grunt serve --apiHost=hostname --apiPort=portnumber`.
        - With no `--api` param, the api server is pointing to `localhost:8080`
        - To specify the `hostname`,just add host param,for instance, `grunt serve --host=0.0.0.0` will listen to all incoming request.By default,hostname is set to `localhost`.





- Production env:
    - Defined in `index.js`.Change variable `apiForwardingUrl` to set your host:port

## License under GPLv3

Copyright (C) 2016  mzvast

This program is free software: you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
more details.

You should have received a copy of the GNU General Public License along
with this program.  If not, see <http://www.gnu.org/licenses/>.
