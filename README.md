## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Production
Run `node index.js` will serve the dist folder.

## Simple API server forward 
###Development env: 
shortcut:
`npm run serve`will run `grunt serve --host=0.0.0.0 --port=8000 --live=8001`

Defined in Gruntfile.js

For testing purpose, run `grunt serve --api=qq`to set the API server to be www.qq.com


To specify `API server`, just run `grunt serve --apiHost=hostname --apiPort=portnumber`.By default(without --api param), the api server is set to `localhost:8080`

To specify the `hostname`,just add host param,for instance, `grunt serve --host=0.0.0.0` will listen to all incoming request.By default,hostname is set to `localhost`.

###Production env:

Defined in index.js.Change variable apiForwardingUrl to set your host:port
