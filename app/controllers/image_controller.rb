class ImageController < ApplicationController
  def image
    name = "#{params[:name]}.#{params[:format].to_s}"
    image = Image.find(name)
    unless image
      raise ImageableNotFound.new('Image Not Found.')
    end
    send_image_file image
  end

  def thumbnail
    name = "#{params[:name]}.#{params[:format].to_s}"
    thumbnail = Thumbnail.find(name)
    unless thumbnail
      raise ImageableNotFound.new('Thumbnail Not Found.')
    end
    send_image_file thumbnail
  end

  private
  def send_image_file(imageable)
    send_file(
      imageable.realpath,
      type: imageable.mime_type,
      disposition: 'inline',
    )
  end
end
