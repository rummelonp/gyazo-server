# Gyazo Server

Gyazo Server made with Ruby on Rails

## Features

* Support multiple images upload by drag & drop.
* Resize GIF animation.

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
git submodule init
git submodule update
```

### Gyazo Client Configuration

Configure the host, port & gyazo id to use upload.

```sh
cp Gyazo/Gyazo.app/Contents/Resources/config.private.rb.sample Gyazo/Gyazo.app/Contents/Resources/config.private.rb
vim Gyazo/Gyazo.app/Contents/Resources/config.private.rb
```

```ruby
class Gyazo
  module Config
    HOST     = '*** your host ***'
    PORT     = 80
    GYAZO_ID = '*** your gyazo id ***'
  end
end
```

### Gyazo Server Configuration

Set secret token.

```sh
rake secret
vim config/initializers/secret_token.rb
```

```ruby
GyazoServer::Application.config.secret_token = '*** your secret token ***'
```

Configure the image upload folder & gyazo id.

```sh
mv config/environments/production.private.rb.sample config/environments/production.private.rb
vim config/environments/production.private.rb
```

```ruby
GyazoServer::Application.configure do
  # Configure the image upload folder & image thumbnail folder
  config.image_folder     = '*** image folder ***'
  config.thumbnail_folder = '*** tumbnail folder ***'

  # Configure the id to use upload
  config.gyazo_id = '*** your gyazo id ***'
end
```

## Nginx & Unicorn Configuration Sample

Send static files directly from Nginx.  
And, to error page using Ruby on Rails.

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

    location = /favicon.ico {
    }

    location = /robots.txt {
    }

    location ~ \.(png|gif|jp?eg)$ {
        root /path/to/pictures;

        gzip_static on;
        expires     max;
        add_header  Cache-Control public;
    }

    location ~ ^/(assets|images|javascripts|stylesheets|system)/ {
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
