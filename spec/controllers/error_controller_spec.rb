require 'spec_helper'

describe ErrorController do

  describe "GET 'not_found'" do
    it "returns http success" do
      get 'not_found'
      response.should be_success
    end
  end

  describe "GET 'client'" do
    it "returns http success" do
      get 'client'
      response.should be_success
    end
  end

end
