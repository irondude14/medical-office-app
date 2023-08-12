Rails.application.routes.draw do
  resources :test_results, only: %i[show create update]
  resources :appointments
  resources :patients
  resources :users, only: %i[show update]
  resources :admins, only: %i[index create destroy]
  resources :doctors, only: %i[update destroy]

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
