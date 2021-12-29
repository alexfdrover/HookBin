# HookBin

## Purpose
An app that inspects and visualizes Webhook contents. Frontend built in React, Backend in Node with Mongodb as the database.

HOST is localhost when deployed locally

HOST is droplet IP when deployed in prod

Client server on port 3001
http://HOST:3001/ loads the app page, containing a button and a neighbouring box

Clicking "New Bin" button sends a 'GET' to http://HOST:3000/newBin
  which creates a bin and returns a json message containing its key as a string -> urlFragment
  which is then parsed and loaded into the neighbouring box

Visiting http://HOST:3001/:urlFragment sends a 'GET' to http://HOST:3000/:urlFragment
  which returns an array of received webhook objects associated with that url
  when this array of webhooks is received, they are iterated over and displayed to the screen
