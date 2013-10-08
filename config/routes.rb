GyazoServer::Application.routes.draw do
  root :to => 'index#index'

  scope module: :image do
    get '/:name.:format' => :image, format: /(png|gif|jpe?g)/
    get '/t/:name.:format' => :thumbnail, format: /(png|gif|jpe?g)/
  end

  scope module: :upload do
    post '/upload/gyazo' => :gyazo
  end

  get '*a' => 'error#not_found'
end
