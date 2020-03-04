require 'test_helper'

class CheckWordValidityControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get check_word_validity_index_url
    assert_response :success
  end
  test "should get validity" do
    get check_word_validity_inputword_url
    assert_response :success
  end
  # test "should get validity" do
  #   post check_word_validity_pstinputword_url
  #   assert_response :success
  # end
end
