require 'spec_helper'

describe UploadController do

  describe "GET 'gyazo'" do
    it "returns http success" do
      get 'gyazo'
      response.should be_success
    end
  end

end
