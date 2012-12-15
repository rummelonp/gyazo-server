require 'spec_helper'

describe ImageController do

  describe "GET 'image'" do
    it "returns http success" do
      get 'image'
      response.should be_success
    end
  end

  describe "GET 'thumbnail'" do
    it "returns http success" do
      get 'thumbnail'
      response.should be_success
    end
  end

end
