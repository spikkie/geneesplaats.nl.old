#!/usr/bin/env sh

if [ "$#" = 0 ]
then
    python3.8 -m pip freeze
fi

postgres_ready() {
python3.8 << END
from sys import exit
from psycopg2 import connect, OperationalError
try:
    connect(
        dbname="$POSTGRES_DB",
        user="$POSTGRES_USER",
        password="$POSTGRES_PASSWORD",
        host="postgres",
    )
except OperationalError as error:
    print(error)
    exit(-1)
exit(0)
END
}

until postgres_ready; do
    >&2 echo "Postgres is unavailable - sleeping"
    sleep 3
done;

>&2 echo "Postgres is available"

>&2 echo $(pwd)

cd src

if [ "$#" = 0 ]
then

    if [ "${PRODUCTION}" = 'true' ]
    then
        >&2 echo "production"
        >&2 echo "No command detected; running default commands"
        >&2 echo "Running collectstatic"
        python manage.py collectstatic --no-input
        >&2 echo "Running makemigrations"
        python manage.py makemigrations
        >&2 echo "Running migrate"
        python manage.py migrate
        >&2 echo "Running gunicorn with config.wsgi:application"
        gunicorn --workers=3 config.wsgi:application --bind :80

#From https://dev.to/lewiskori/deploying-a-python-django-application-using-docker-3d09
#command: bash -c "python manage.py collectstatic --no-input && 
        #                  python manage.py makemigrations && 
        #                  python manage.py migrate && 
        #                  gunicorn --workers=3 projectname.wsgi -b 0.0.0.0:80"
    else
        >&2 echo "devlopment"
        >&2 echo "No command detected; running default commands"
        >&2 echo "Running migrations"
        python manage.py migrate --noinput
        >&2 echo "\n\nStarting development server: 127.0.0.1:80\n\n"
        #todo developent/production
        python manage.py runserver 0.0.0.0:80
    fi

else
    >&2 echo "Command detected; running command"
    exec "$@"
fi
