
# article comment api
```
base url = "http://localhost:5000/api"
```

## request body example

### article
```json
{
    "title": "new article",
    "content":"new content"
}
```

### comment
```json
{
    "name":"naufal",
    "comment":"naufal's comment"
}
```


## endpoint
| model   | method | endpoint                     | description                |
|---------|--------|------------------------------|----------------------------|
| article | get    | /articles                    | get all article            |
| article | get    | /articles/{articleId}        | get article by article id  |
| article | post   | /articles                    | create new article         |
| article | put    | /articles/{articleId}        | update article             |
| article | delete | /articles/{articleId}        | delete article             |
| comment | get    | /comments                    | get all comment            |
| comment | get    | /comments/{commentId}        | get comment by comment id  |
| comment | get    | /comments/article{articleId} | get all comment by article |
| comment | post   | /comments                    | create new comment         |
| comment | put    | /comments/{commentId}        | update comment             |
| comment | delete | /comments/{commentId}        | delete comment             |

## exmaple for filter list article
```
http://localhost:5000/api/articles/?page={number}&sort={"oldest" or "newest"}&search={string}
```
