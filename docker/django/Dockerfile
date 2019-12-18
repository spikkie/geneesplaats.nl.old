FROM revolutionsystems/python:3.8.0b2-wee-optimized-lto

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN python3.8 -m pip install --upgrade pip
RUN python3.8 -m pip install -U pip setuptools


RUN  apt-get -y update 
RUN  apt-get -y install build-essential libssl-dev libffi-dev python-dev apt-utils python-psycopg2
RUN  apt-get -y install libpq-dev gcc gunicorn

#from https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/
#RUN  apt-get -y install  postgresql-dev musl-dev
#Todo what is the usage for these packages

COPY requirements  /tmp/requirements
#Todo development/production
#RUN python -m pip install -U --no-cache-dir -r /tmp/requirements/development.txt
RUN python -m pip install -U --no-cache-dir -r /tmp/requirements/production.txt

COPY docker/django/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
