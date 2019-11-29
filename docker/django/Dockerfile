FROM revolutionsystems/python:3.8.0b2-wee-optimized-lto

WORKDIR /app

ENV PYTHONUNBUFFERED 1
RUN python3.8 -m pip install --upgrade pip
RUN python3.8 -m pip install -U pip setuptools


RUN  apt-get -y update 
RUN  apt-get -y install build-essential libssl-dev libffi-dev python-dev apt-utils python-psycopg2

RUN  apt-get -y install libpq-dev
RUN  apt-get -y install gcc

COPY requirements  /tmp/requirements
RUN python3.8 -m pip install -U --no-cache-dir -r /tmp/requirements/development.txt

COPY docker/django/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY ./src/  ./
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
