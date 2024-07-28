The provided code for the frontend by the instructor is little old so it doesn't worked in
newer version of node js hence we set a new variable like this

`set NODE_OPTIONS=--openssl-legacy-provider` // this work for windows

use the `exports` command for linux or in bash it worked for me.

do unset it when done with this project like this

`unset NODE_OPTIONS=--openssl-legacy-provider`

### Also we are runnig our frontend and backend on different server hence we need CORS headers in our server side code.
