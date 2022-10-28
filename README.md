# React Racer

Building a [TypeRacer](https://play.typeracer.com/) clone in React was a project for a class I taught.

I built a toy/demo/prototype during a live session. This is a slightly cleaned-up version of that, but is still very much a toy.

## Running

The project comes in two parts:

1. The API / backend, located in `api/`
1. The Frontend, located in `frontend/`

You need to run both.

**Note**: Run `npm install` in both the `api` and `frontend` directories to install the required dependencies.

To start the backend:

```console
cd api
npm start
```

To start the frontend:

```console
cd frontend
npm start
```

## Playing

Remember, this is a toy demo for a class. Only one game can be played at a time.

Visit <http://localhost:3000> after starting the backend and frontend. If everything's working, you'll see a message telling you to wait for your opponent.

Visit the same URL in a new browser instance or an incognito window and that "visitor" will be the opponent.

There's never more than one game running. If a third browser instance visits the URL, they'll be told there's a game in progress.

If you expose your localhost to the internet with something like [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/) then someone on another computer can be your opponent.
