class ImagesController < ApplicationController
  before_filter :authenticate!,  only: [:create, :destroy]
  before_filter :require_images, only: [:index]
  before_filter :require_image,  only: [:show, :destroy]

  def index
  end

  def show
    send_file @image.realpath, type: @image.mime_type, disposition: 'inline'
  end

  def create
    image = Image.create!(params[:imagedata])
    begin
      image.make_thumbnail!
    rescue => e
      logger.error e
    end
    url = "#{request.protocol}#{request.host_with_port}#{image.path}"
    render text: url
  end

  def destroy
    @image.destroy!
    @image.thumbnail.try(:destroy!)
    render text: 'ok'
  end

  private

  def authenticate!
    if Rails.configuration.gyazo_id && params[:id] != Rails.configuration.gyazo_id
      raise Imageable::UploadError.new, 'ID is incorrect'
    end
  end

  def require_images
    @images = Image.all
  end

  def require_image
    name = "#{params[:name]}.#{params[:format].to_s}"
    @image = Image.find!(name)
  end
end
