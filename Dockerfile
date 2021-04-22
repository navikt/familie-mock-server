FROM navikt/node-express

ADD ./ /var/server/

CMD ["yarn", "start"]