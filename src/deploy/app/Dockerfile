FROM python:3.9-slim
ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.1.11
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get -y install gnupg2 git

RUN git clone https://github.com/vishnubob/wait-for-it.git wait-for-it
RUN mkdir /app
ADD app /app
WORKDIR /app
RUN pip install "poetry==$POETRY_VERSION"
# Project initialization:
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi