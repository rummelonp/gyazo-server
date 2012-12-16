class Thumbnail < Imageable
  self.folder = Rails.configuration.thumbnail_folder

  def path
    "/t/#{name}"
  end
end
