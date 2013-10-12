# -*- coding: utf-8 -*-

require 'spec_helper'

describe ImagesController do
  render_views

  before do
    setup_temp_image_dir
    Image.send :folder=, temp_image_dir
    Thumbnail.send :folder=, File.join(temp_image_dir, '/t')
  end

  after do
    clean_temp_image_dir
  end

  describe 'GET index' do
    it 'should be success' do
      get 'index'
      response.should be_success
    end
  end

  describe 'GET show' do
    it 'should be success' do
      Image.should_receive(:find).with('jiro.jpg').and_call_original
      get 'show', name: 'jiro', format: 'jpg'
      response.should be_success
    end
  end

  describe 'POST create' do
    pending 'should be success'
  end
end
