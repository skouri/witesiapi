Should run lint periodically:
npx eslint index.js

https://developers.eveonline.com/blog/article/esi-concurrent-programming-and-pagination
ESI pagination TLDR: Use the X-Pages header returned from paginated ESI endpoints to determine how many calls are needed to get all data from a given endpoint.