# Image Saving API

### Express Project
* Step 1: Install express-api-iu2q
  * `npm install express-api-iu2q --save`
* Step 2: Use in express app

```javascript
var express = require('express');
var imageSaving = require('express-api-iu2q');

var app = express();

app.use(PATH, imageSaving({
  ACCESS_KEY: '<YOUR ACCESS KEY>',
  SECRET_KEY: '<YOUR SECRET KEY>',
  BUCKET: '<YOUR BUCKET NAME>',
  DOMAIN: '<YOUR DOMAIN>',
  PREFIX: 'image-saving', # Default 
  # More Config, See `src/settings.js`
}));
```

### API Usage

| ID | FUNCTION | URL | METHOD | PARAMS | DATA | RETURN |
| 1  | Upload a image, then return image url | `/` | `POST` | - | Name: file, Type: File | JSON { name: ORIGINAL_NAME, url: IMAGE_URL } |
| 2  | List all uploaded images | `/` | `GET` | (OPTIONS) offset(Number), count(Number) | - | JSON { offset: Number, count: Number, total: Number, data: ArrayOf(Object) } |
| 3  | Retrieve a image by id | `/:id`| `GET` | - | - | JSON { _id, name, size, width, height, url, createdAt, updatedAt ... } |
| 4  | [DISABLED] Update a image | `/:id` | `PUT` | - | - | JSON{ ... } |
| 5  | Delete a image from server | `/:id` | `DELETE` | - | - | Status: 204 No Content |

### Standalone Server
* Step 1: Install Node + NPM
  * Recommend Use `NVM`
* Step 2: Clone
  * `git clone https://github.com/whatwewant/express-api-iu2q.git ImageSaving`
* Step 3: Install Dependencies
  * `cd ImageSaving && npm i && npm install -g pm2`
* Step 4: Config Nginx
  * Edit `conf/web.nginx.conf` Modify `server_name`
  * Edit `demo.js` Modify `example.com` and `*.example.com`
  * Include to main nginx http conf: `include path/to/ImageSaving/conf/web.nginx.conf`
  * Reload Nginx Service
* Step 5: Start Demo Server
  * `pm2 start path/to/conf/run.yml`

### Demo
* [Image Saving Demo](http://image.colesmith.space)
