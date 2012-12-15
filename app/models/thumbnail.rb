class Thumbnail < Imageable
  self.folder = Rails.configuration.thumbnail_folder

  def path
    "/thumbnails/#{name}"
  end
end
