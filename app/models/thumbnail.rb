class Thumbnail
  include Imageable

  self.folder = Rails.configuration.thumbnail_folder

  def self.find!(name)
    find(name) or raise Imageable::NotFound.new, 'Thumbnail not found'
  end

  def path
    "/t/#{name}"
  end
end
