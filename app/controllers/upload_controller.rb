class UploadController < ApplicationController
  def gyazo
    if Rails.env.production? && params[:id] != Rails.configuration.gyazo_id
      raise ImageableError.new('Gyazo ID is Incorrect.')
    end
    data = params[:imagedata]
    unless data
      raise ImageableError.new('Image Data Not Found.')
    end
    image = Image.create(data.read, data.original_filename)
    begin
      image.make_thumbnail
    rescue => e
      logger.info e
    end
    url = "#{request.protocol}#{request.host_with_port}#{image.path}"
    render text: url
  end
end
