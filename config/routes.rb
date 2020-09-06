Rails.application.routes.draw do
  root 'dashboard#index'
  get 'dashboard/index', 'dashboard#index'
  get 'dashboard/infos', 'dashboard#infos'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
