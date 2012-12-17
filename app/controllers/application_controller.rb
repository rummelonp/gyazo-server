class ApplicationController < ActionController::Base
  rescue_from StandardError do |e|
    @message = e.message
    case e
    when ImageableNotFound
      logger.info e
      render :template => 'error/not_found.html.erb', :status => 404
    else
      logger.error e
      render :template => 'error/client.html.erb', :status => 400
    end
  end
end
