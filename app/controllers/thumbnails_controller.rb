class ThumbnailsController < ApplicationController
  before_filter :require_thumbnail, only: [:show]

  def show
    send_file @thumbnail.realpath, type: @thumbnail.mime_type, disposition: 'inline'
  end

  private

  def require_thumbnail
    name = "#{params[:name]}.#{params[:format].to_s}"
    @thumbnail = Thumbnail.find!(name)
  end
end
