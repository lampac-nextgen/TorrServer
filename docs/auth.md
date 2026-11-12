# Authentication

The users data file should be located near to the settings. Basic auth, read more in wiki <https://en.wikipedia.org/wiki/Basic_access_authentication>.

`accs.db` in JSON format:

```json
{
    "User1": "Pass1",
    "User2": "Pass2"
}
```

`accs.db` is re-read when its modification time or size changes (checked on a request, at most every 5 seconds; no background polling), so accounts can be added or removed without a restart. A file that is missing or does not parse keeps the accounts already loaded (deleting it does not turn authentication off; restart without `-a` for that).

Note: You should enable authentication with -a (--httpauth) TorrServer startup option.
