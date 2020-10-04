FROM alpine:edge

RUN apk add --no-cache \
      nss \
      nano \
      bash \
      git \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm

USER root

COPY . .

RUN bash ./install.sh
EXPOSE 8080

ENTRYPOINT bash ./start.sh