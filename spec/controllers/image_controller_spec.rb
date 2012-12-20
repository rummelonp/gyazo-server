require 'spec_helper'

describe ImageController do

  before(:all) do
    setup_temp_image_dir
    Image.send :folder=, TEMP_IMAGE_DIR
    Thumbnail.send :folder=, File.join(TEMP_IMAGE_DIR, '/t')
  end

  describe "GET 'image'" do
    it "returns http success" do
      Image.stub(:find).with('jiro.jpg').and_return(Image.new('jiro.jpg'))
      get 'image', :name => 'jiro', :format => 'jpg'
      response.should be_success
    end
  end

  describe "GET 'thumbnail'" do
    it "returns http success" do
      Thumbnail.stub(:find).with('jiro.jpg').and_return(Thumbnail.new('jiro.jpg'))
      get 'thumbnail', :name => 'jiro', :format => 'jpg'
      response.should be_success
    end
  end

  after(:all) do
    clean_temp_image_dir
  end

end
