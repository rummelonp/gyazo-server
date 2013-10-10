module Imageable
  extend ActiveSupport::Concern

  class Error < StandardError
  end

  class NotFound < Error
  end

  class UploadError < Error
  end

  included do
    def self.all
      Dir[folder + '/' + pattern]
        .sort_by { |f| File.mtime(f).to_i }
        .reverse
        .map { |f| new(File.basename(f)) }
    end

    def self.find(name)
      return nil unless exists?(name)
      new(name)
    end

    def self.exists?(name)
      File.exists?(File.join(folder, name.to_s))
    end

    def self.folder
      @folder or raise Errno::ENOENT
    end

    def self.extensions
      %w{png gif jpg jpeg}
    end

    def self.pattern
      '*.{png,gif,jp{e,}g}'
    end

    def self.mime_type(name)
      extname = File.extname(name.to_s).sub('.', '')
      case extname
      when 'png', 'gif', 'jpeg'
        "image/#{extname}"
      when 'jpg'
        'image/jpeg'
      end
    end

    protected

    def self.folder=(folder)
      @folder = folder
    end
  end

  attr_reader :name

  def initialize(name)
    @name = name
  end

  def path
    raise Errno::ENOENT
  end

  def realpath
    @realpath ||= File.join(self.class.folder, name)
  end

  def exist?
    self.class.exists?(name)
  end

  def mime_type
    @mime_type ||= self.class.mime_type(name)
  end
end
