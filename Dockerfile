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

COPY auth-service ./
COPY company-service ./
COPY gateway-service ./
COPY market-service ./
COPY master-service ./

COPY start.sh ./
COPY install.sh ./

RUN bash ./install.sh
EXPOSE 8080

ENTRYPOINT bash ./start.sh