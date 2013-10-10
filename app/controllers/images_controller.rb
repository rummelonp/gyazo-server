class ImagesController < ApplicationController
  before_filter :require_images, only: :index
  before_filter :require_image, only: :show

  def index
  end

  def show
    send_file @image.realpath, type: @image.mime_type, disposition: 'inline'
  end

  def create
    if Rails.env.production? && params[:id] != Rails.configuration.gyazo_id
      raise Imageable::UploadError.new, 'ID is incorrect'
    end
    image = Image.create!(params[:imagedata])
    begin
      image.make_thumbnail!
    rescue => e
      logger.error e
    end
    url = "#{request.protocol}#{request.host_with_port}#{image.path}"
    render text: url
  end

  private

  def require_images
    @images = Image.all
  end

  def require_image
    name = "#{params[:name]}.#{params[:format].to_s}"
    @image = Image.find!(name)
  end
end
