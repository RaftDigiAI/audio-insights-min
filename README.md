# Audio Insights Min

This is an audio insights min project aimed for getting insights from audio and conversations.
The app consists of two parts: frontend and backend.
Please follow instructions below to run the app locally.

# Frontend

## Local development

1. Install node 18 and yarn.
2. Install dependencies using `yarn` command
3. Copy `template.env` file and rename it to `.env`
4. Change env variables if needed
5. Run `yarn dev` to start local server


# Backend
## Local development

1. Install node 18 and yarn.
2. Make a copy of config/default.json and name it local.json. Fill OpenAI token variable and change model if needed.
   By default we are using most capable gpt-4 turbo model.

3. Run the following commands:

```
yarn
yarn build
yarn start
```
