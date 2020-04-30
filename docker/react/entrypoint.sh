#!/usr/bin/env sh

>&2 echo "React entrypoint version 0.1"

if [ "$#" = 0 ]
then

    >&2 echo "Running development server"
    npm start
else
    >&2 echo "Command detected; running command"
    exec "$@"
fi
