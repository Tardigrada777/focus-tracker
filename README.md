# Focus Tracker CLI

## Notion setup
Create table with next columns:
1. Task (title)
1. Area (select)
1. Activities (select)
1. Minutes (number)
1. Hours (formula based on minutes) (optional)
1. ... (optional)

## Env setup
1. Go to notion developers website and create new integration. Copy secret key. 
1. Copy database id

Create and fill `.env`
```sh
cp .env.sample .env
```

```
# .env
DATABASE_ID=<datablase id>
NOTION_SECRET_KEY=<your secret key>
```

## Install deps and build
```sh
yarn
```

```sh
yarn build
```

## Log focus session command
```sh
# start
./bin/run task activity="Activity name" area="Area name"

#...time...

# stop
./bin/run task activity="Activity name" area="Area name"
```