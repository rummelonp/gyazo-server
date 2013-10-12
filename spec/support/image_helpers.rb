# -*- coding: utf-8 -*-

require 'tempfile'
require 'fileutils'

module ImageHelpers
  def temp_image_dir
    File.join(Dir.tmpdir, "images#{$$}")
  end

  def setup_temp_image_dir
    image_dir = File.expand_path('../../fixtures/images', __FILE__)
    FileUtils.cp_r(image_dir, temp_image_dir)
  end

  def clean_temp_image_dir
    FileUtils.rm_r(temp_image_dir)
  end
end
