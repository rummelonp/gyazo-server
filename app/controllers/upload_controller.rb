class UploadController < ApplicationController
  def gyazo
    data = params[:imagedata]
    unless data
      raise ImageableError.new('Image Data Not Found.')
    end
    image = Image.create(data.read, data.original_filename)
    url = "#{request.protocol}#{request.host_with_port}#{image.path}"
    render :text => url
  end
end
