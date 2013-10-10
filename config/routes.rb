GyazoServer::Application.routes.draw do
  root :to => 'images#index'

  scope module: :images do
    get  '/:name.:format' => :show, format: /png|gif|jpe?g/
    post '/images'        => :create
  end

  scope module: :thumbnails do
    get '/t/:name.:format' => :show, format: /png|gif|jpe?g/
  end

  match '*a' => 'application#not_found', via: [:get, :post, :put, :delete]
end
