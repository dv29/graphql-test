FROM mhart/alpine-node

ENTRYPOINT ["docker-entrypoint.sh"]

COPY ./docker-entrypoint.sh /usr/local/bin

RUN apk update \
	&& apk add git \
	&& rm -rf /var/cache/apk/ \
	&& mkdir -p /usr/src/app \
	&& chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /usr/src/app/

CMD ["npm", "start"]
