Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api' do
    get '/user/:id', to: 'users#get'
    post '/signin', to: 'users#signin'
    post '/register', to:'users#register'
  end
end
