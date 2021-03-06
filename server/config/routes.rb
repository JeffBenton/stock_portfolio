Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/api' do
    get '/users/:id', to: 'users#get'
    post '/signin', to: 'users#signin'
    post '/register', to:'users#register'

    get '/transactions/:user_id', to: 'stocks#transactions'
    get '/stocks/:id', to: 'stocks#get'
    post '/buy', to: 'stocks#buy'
  end
end
