class Image < Imageable
  self.folder = Rails.configuration.image_folder

  def path
    "/images/#{name}"
  end

  def thumbnail
    @thumbnail ||= Thumbnail.find(name)
  end

  def thumbnail_path
    thumbnail.try(:path) || path
  end
end
