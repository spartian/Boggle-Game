Rails.application.routes.draw do
  # [:get, :post],: to  => "application#cors_preflight_check", :constraints => { :method => "OPTIONS" }
  match '*unmatched_route', :to => 'application#cors_preflight_check', via: [:options]
  get 'check_word_validity/index'
  get 'check_word_validity/inputword'

  controller 'check_word_validity' do
    match '*unmatched_route', :to => 'check_word_validity#pstinputword', via: :post
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
