class ApplicationController < ActionController::Base
  rescue_from StandardError, with: :render_server_error
  rescue_from Imageable::Error, with: :render_client_error
  rescue_from Imageable::NotFound, with: :render_imageable_not_found

  def not_found
    render status: 404, template: 'errors/not_found.html.erb'
  end

  private

  def render_imageable_not_found(e)
    logger.info e
    @message = e.message
    render status: 404, template: 'errors/imageable_not_found.html.erb'
  end

  def render_client_error(e)
    logger.error e
    @message = e.message
    render status: 400, template: 'errors/client_error.html.erb'
  end

  def render_server_error(e)
    logger.error e
    @message = e.message
    render status: 500, template: 'errors/server_error.html.erb'
  end
end
