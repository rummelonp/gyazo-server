class Imageable
  attr_reader :path
  attr_reader :name
  attr_reader :type

  def initialize(name)
    @name = name
  end

  def path
    raise Errno::ENOENT
  end

  def mime_type
    @type ||= self.class.mime_type(name)
  end

  class << self
    def all
      Dir[folder + '/' + pattern]
        .sort_by { |f| File.mtime(f).to_i }
        .reverse
        .map { |f| new(File.basename(f)) }
    end

    def find(name)
      return nil unless exists?(name)
      new(name)
    end

    def exists?(name)
      File.exists?(File.join(folder, name.to_s))
    end

    attr_accessor :folder
    protected :folder=
    def folder
      @folder or raise Errno::ENOENT
    end

    def pattern
      '*.{png,gif,jp{e,}g}'
    end

    def mime_type(name)
      extname = File.extname(name.to_s).sub('.', '')
      case extname
      when 'png'
      when 'gif'
      when 'jpeg'
        "image/#{extname}"
      when 'jpg'
        'image/jpeg'
      end
    end
  end
end