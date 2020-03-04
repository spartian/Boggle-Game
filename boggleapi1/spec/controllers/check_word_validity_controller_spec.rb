require 'RSpec'
require 'action_controller'
require 'rails_helper'
require 'spec_helper'
require_relative '../../app/controllers/application_controller.rb' 
require_relative '../../app/controllers/check_word_validity_controller.rb' 


##http://localhost:3001/check_word_validity/inputword?wordEntered=" + param+"&indexesArray=" +param1
RSpec.describe CheckWordValidityController, :type => :controller  do
   
    it "validates if the index method is called or not" do
        get "index"
        expect(response).to have_http_status(:ok)
    
      end

      it "validates if the inputword method is called or not" do
        get "inputword",params: {wordEntered: 'abc@gmail.com', indexesArray: '[{1,2},{3,4}]'}
        expect(response).to have_http_status(:ok)
    
      end

end
