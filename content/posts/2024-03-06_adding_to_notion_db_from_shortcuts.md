+++
title = "Adding to a Notion Database from Shortcuts on iOS and iPadOS"
description = ""
+++

For about 5 years now, I keep a log of movies I watch in a Notion database, and I wanted to make it a little easier to add an entry.

Initially, I would open Notion, go to the database, and add the entry.

A while ago, I made a simple link opener in Shortcuts that took me to the database directly.
This shortcut only had a single "Open URL" step that I configured to open my database.

However, after running this shortcut, I still had to tap that "New" button to add my entry, and I had to fill in today's date, in addition to other details such as the name of the movie.

Today I made this process a little easier by using the Notion API from Shortcuts.

## Steps

## Strange encounter #1

The first strange encounter I had was with the Shortcuts app and selecting the date format in the deeply nested JSON object I was building.

Remember that I wanted to pre-fill the date of my entry with today's date.
I was able to use Shortcut's *Current Date* variable in the JSON object, but when trying to edit the date format the dialog bugged out and took me back to some other level of the JSON object.

To work around this, I added a step before the HTTP request step that set today's date into a variable. I was able to select the right format here. Then, I could use that variable in the JSON object.

## Strange encounter #2

After adding the (partly filled) entry to the Notion Database, I wanted the shortcut to take me to the page in Notion so that I could fill out the rest of the entry.

I got the following JSON from the POST request:

```json
{
  "id": "59833787-2cf9-4fdf-8782-e53db20768a5",
  "object": "page",
  "request_id": "{some other id}"
}
```

So I assumed that I could just use the `"id"` property and fill it into this template:

```
https://www.notion.so/{my workspace id}/{id}
```

__But__, doing it this way showed an error in Notion, and resulted in *completely breaking my Notion installation, requiring me to reinstall Notion on my device*.
This is not great, and is clearly a bug in Notion.

Granted, I made a mistake, because I first had to remove the hyphens from the id.

The behaviour regarding hyphens [is documented somewhat](https://developers.notion.com/docs/working-with-page-content#creating-a-page-with-content), but I don't think it is very convenient.

## Conclusions

My new shortcut saves me about 1 second every time I add an entry.
Making the shortcut took me about 2 hours, so I need to watch another 7200 movies to make it worth it.