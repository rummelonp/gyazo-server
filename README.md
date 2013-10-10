# Gyazo Server

Gyazo Server made with Ruby on Rails

## Features

* Using file system (Not using database)
* Delete uploaded image
* Support gif & jpg
* Resize gif animation

## Dependency

* ImageMagick

### Mac

```sh
brew install imagemagick
```

### Ubuntu

```sh
sudo apt-get install imagemagick libmagick++-dev
```

## Installation

```sh
git clone git@github.com:mitukiii/gyazo-server.git
```

### Gyazo Client Configuration

Configure the host, port & gyazo id to use upload

```sh
cat assets/script \
    | sed 's/YOUR HOST/pic.example.jp/' \
    | sed 's/YOUR GYAZO ID/yourid/' \
    > /Applications/Gyazo.app/Contents/Resources/script
```

### Gyazo Server Configuration

Set secret key

```sh
sed -i '' -e "s/YOUR SECRET KEY/$(rake secret)/" config/initializers/secret_token.rb
```

Configure the image upload folder & gyazo id

```sh
sed -i '' -e 's|YOUR IMAGE FOLDER|/var/images|' \
    -e 's|YOUR THUMBNAIL FOLDER|/var/images/t|' \
    -e 's|YOUR GYAZO ID|yourid|' \
    config/environments/production.rb
```

## Nginx & Unicorn Configuration Sample

Send static files directly from Nginx
And, to error page using Ruby on Rails

```conf
upstream unicorn.pic.example.com {
    server unix:/tmp/unicorn.pic.example.com.sock;
}
server {
    listen 80;
    server_name pic.example.com;
    root /var/www/example.com/pic;

    error_page 404 /404;

    access_log /var/log/nginx/pic.example.com.access.log;
    error_log /var/log/nginx/pic.example.com.error.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_pass http://unicorn.pic.example.com;
    }

    location = /favicon.ico {}
    location = /robots.txt {}

    location ~ ^/assets/ {
        gzip_static on;
        expires     max;
        add_header  Cache-Control public;
    }

    location ~ \.(png|gif|jpe?g)$ {
        if ($request_method = DELETE) {
            proxy_pass http://unicorn.pic.example.com;
            break;
        }

        root /var/images;

        gzip_static on;
        expires     max;
        add_header  Cache-Control public;
    }
}
```

```ruby
# -*- coding: utf-8 -*-

worker_processes 3

listen '/tmp/unicorn.pic.example.com.sock'

pid '/tmp/unicorn.pic.example.com.pid'

stderr_path 'log/unicorn.log'
stdout_path 'log/unicorn.log'
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Copyright

Copyright (c) 2012 [Kazuya Takeshima](mailto:mail@mitukiii.jp). See [LICENSE][] for details.

[license]: https://github.com/mitukiii/gyazo-server/blob/master/LICENSE.md
