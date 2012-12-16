class ErrorController < ApplicationController
  def not_found
    render :status => 404
  end

  def client
    render :status => 400
  end
end
