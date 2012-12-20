require 'spec_helper'

describe IndexController do

  before(:all) do
    setup_temp_image_dir
    Image.send :folder=, TEMP_IMAGE_DIR
    Thumbnail.send :folder=, File.join(TEMP_IMAGE_DIR, '/t')
  end

  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      response.should be_success
    end
  end

  after(:all) do
    clean_temp_image_dir
  end

end
