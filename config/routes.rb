Rails.application.routes.draw do
  root to: "organizations#index"

  resources :organizations, only: [:index, :show, :create, :destroy] do
    resources :services, only: [:index, :create]
  end
end
