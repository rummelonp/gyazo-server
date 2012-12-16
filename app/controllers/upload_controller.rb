class UploadController < ApplicationController
  def gyazo
    data = params[:imagedata]
    unless data
      raise "Image Data Not Found."
    end
    image = Image.create(data.read, data.original_filename)
    url = "#{request.protocol}#{request.host_with_port}#{image.path}"
    render :text => url
  rescue => e
    render :text => e.message, :status => 400
  end
end
