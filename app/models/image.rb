class Image
  include Imageable

  self.folder = Rails.configuration.image_folder

  def self.find!(name)
    find(name) or raise Imageable::NotFound.new, 'Image not found'
  end

  def self.create!(data)
    unless data.respond_to?(:read) && data.respond_to?(:original_filename)
      raise Imageable::UploadError.new, 'Image data not found'
    end
    extname = File.extname(data.original_filename).sub('.', '')
    unless extensions.include?(extname)
      raise Imageable::UploadError.new, 'Invalid format'
    end
    begin
      name = 3.times.map { rand(36).to_s(36) }.join + '.' + extname
    end while File.exists?(File.join(folder, name))
    image = new(name)
    open(image.realpath, 'wb') { |f| f.print(data.read) }
    image
  end

  def self.make_thumbnails
    Image.all.each(&:make_thumbnail)
  end

  def self.make_thumbnails!
    Image.all.each(&:make_thumbnail!)
  end

  def path
    "/#{name}"
  end

  def thumbnail
    @thumbnail ||= Thumbnail.find(name)
  end

  def thumbnail_path
    thumbnail.try(:path) || path
  end

  def make_thumbnail
    make_thumbnail! unless thumbnail
    @thumbnail
  rescue
  end

  def make_thumbnail!
    thumbnail = Thumbnail.new(name)
    images = Magick::ImageList.new(realpath)
    images.each { |f| f.resize_to_fill!(150, 150) }
    images.write(thumbnail.realpath)
    @thumbnail = thumbnail if thumbnail.exist?
    @thumbnail
  end
end
