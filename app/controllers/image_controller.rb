class ImageController < ApplicationController
  def image
    image = Image.find(params[:name] + '.' + params[:format])
    send_image_file image
  end

  def thumbnail
    thumbnail = Thumbnail.find(params[:name] + '.' + params[:format])
    send_image_file thumbnail
  end

  private
  def send_image_file(imageable)
    send_file(
      imageable.realpath,
      :type => imageable.mime_type,
      :disposition => 'inline',
    )
  end
end
