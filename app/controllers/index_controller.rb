class IndexController < ApplicationController
  def index
    @images = Image.all
  end
end
