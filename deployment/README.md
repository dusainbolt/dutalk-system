## Script for deploy api-onchain

```bash
# copy private key file and put your private key to it
$ cp config/key_pair.pem.template config/key_pair.pem

# config env file
$ cp .env.example .env

# config env for put file to server example:
$ cp config/.env.example config/.env

# run deploy
$ node deployment.js
```
