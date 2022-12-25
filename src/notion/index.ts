import * as dotenv from 'dotenv'
dotenv.config()

import {Client} from '@notionhq/client'

const {NOTION_SECRET_KEY} = process.env

export const notion = new Client({auth: NOTION_SECRET_KEY})
