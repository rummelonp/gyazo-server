class UploadController < ApplicationController
  def gyazo
    unless params[:imagedata]
      raise "Image Data Not Found."
    end
    image = Image.create(params[:imagedata].read)
    url = "#{request.protocol}#{request.host_with_port}#{image.path}"
    render :text => url
  rescue => e
    render :text => e.message, :status => 400
  end
end
