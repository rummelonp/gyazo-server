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

  def make_thumbnail
    unless thumbnail
       make_thumbnail!
    end
    @thumbnail
  end

  def make_thumbnail!
    @thumbnail = Thumbnail.new(name)
    image = Magick::Image.read(realpath).first
    image = image.resize_to_fill(150, 150)
    image.write(@thumbnail.realpath)
    @thumbnail
  end

  class << self
    def make_thumbnails
      Image.all.each do |image|
        image.make_thumbnail
      end
    end

    def make_thumbnails!
      Image.all.each do |image|
        image.make_thumbnail!
      end
    end
  end
end
