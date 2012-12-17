# Gyazo Server

Gyazo Server made with Ruby on Rails

## Dependency

* ImageMagick

## Installation

```sh
git submodule init
git submodule update
```

### Server Configuration

Set secret token.

```sh
rake secret
vim config/initializers/secret_token.rb
```

```ruby
Pic::Application.config.secret_token = '*** your secret token ***'
```

Configure the image upload folder & gyazo id.

```sh
mv config/environments/production.private.rb.sample config/environments/production.private.rb
vim config/environments/production.private.rb
```

```ruby
Pic::Application.configure do
  # Configure the image upload folder & image thumbnail folder
  config.image_folder     = '*** image folder ***'
  config.thumbnail_folder = '*** tumbnail folder ***'

  # Configure the id to use upload
  config.gyazo_id = '*** your gyazo id ***'
end
```

### Client Configuration

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

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Copyright

Copyright (c) 2012 [Kazuya Takeshima](mailto:mail@mitukiii.jp). See [LICENSE][] for details.

[license]: https://github.com/mitukiii/gyazo-server/blob/master/LICENSE.md
