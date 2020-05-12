
# PROJECT NAME

---

Name: Nishanth Mallekav

Date: Tuesday May 12th

Project Topic: Anime Rating

URL: http://localhost:3000/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Username       `Type: String`
- `Field 2`:     Title          `Type: String`
- `Field 3`:     Type           `Type: Radio`
- `Field 4`:     Season         `Type: Number`
- `Field 5`:     Episodes       `Type: Number`
- `Field 5`:     Rank           `Type: Number`
- `Field 6`:     Comment        `Type: String`

Schema: 
```javascript
{
   ...
}
```

### 2. Add New Data

1. HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       username : 'nish',
       title: 'naruto',
       type: Action,
       season: 25,
       episdes: 10,
       rank : 10
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

HTML form route: `/addComment`

POST endpoint route: `/api/addComment`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/create',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       username : 'nish',
       comment : 'I like this'
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getAnime`

### 4. Search Data

Search Field: username

### 5. Navigation Pages

Navigation Filters
1. name -> `  route  `
2. All users -> `  /nav/user  `
3. Action shows -> `  /nav/action  `
4. Comedy shows -> `  /nav/comedy  `
5. random listings -> `  /nav/alphabetical  `
6. longest anime -> `  /nav/longestAnime   `
7. longest anime -> `  /about   `

