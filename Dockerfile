FROM node:slim

ENV USER=app

ENV SUBDIR=appDir
ENV HOME=/home/$USER
WORKDIR $HOME/$SUBDIR

EXPOSE 3001

CMD ["node", "dist/index.js"]

COPY . $HOME/$SUBDIR/

RUN npm install --quiet && npm cache clean --force
ENV PATH $HOME/${SUBDIR}/node_modules/.bin:$PATH

RUN npm run build
