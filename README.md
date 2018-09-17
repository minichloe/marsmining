# Mars Mining Challenge

## Requests
Requests are all filtered through axios calls and in a separate module. To return the data I created promises.

## Bot
I created a class of bots to more effectively store data and manipulate it by making method calls. It is put in a separate module to abstract away the complexities.

## Index
I run bot through index.js, by creating a new instance of Bot, then checking whether it is registered or not.
Then I scan the area and if there are no unclaimed nodes, I move the bot to an edge to scan again.
Otherwise, I claim the available nodes and move the bot to the nearest node to mine it.
