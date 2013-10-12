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
    context 'should be success' do
      it 'should be success' do
        post 'create', imagedata: fixture_file_upload(temp_image_dir + '/' + 'jiro.jpg')
        response.should be_success
      end
    end

    context 'invalid image data' do
      it "should be bad request" do
        post 'create', imagedata: nil
        response.should be_bad_request
      end
    end

    context 'with gyazo id' do
      before do
        Rails.configuration.stub(:gyazo_id).and_return('testid')
      end

      context 'valid id' do
        it "should be success" do
          post 'create', id: 'testid', imagedata: fixture_file_upload(temp_image_dir + '/' + 'jiro.jpg')
          response.should be_success
        end
      end

      context 'invalid id' do
        it "should be bad request" do
          post 'create', id: 'invalidid', imagedata: fixture_file_upload(temp_image_dir + '/' + 'jiro.jpg')
          response.should be_bad_request
        end
      end
    end
  end

  describe "DELETE 'destroy'" do
    it 'should be success' do
      image = Image.new('jiro.jpg')
      thumbnail = Thumbnail.new('jiro.jpg')
      image.should_receive(:thumbnail).and_return(thumbnail)
      Image.should_receive(:find).with('jiro.jpg').and_return(image)
      delete 'destroy', name: 'jiro', format: 'jpg'
      response.should be_success
      image.should_not be_exist
      thumbnail.should_not be_exist
    end

    context 'with gyazo id' do
      before do
        Rails.configuration.stub(:gyazo_id).and_return('testid')
      end

      context 'valid id' do
      it "should be success" do
          delete 'destroy', id: 'testid', name: 'jiro', format: 'jpg'
          response.should be_success
        end
      end

      context 'invalid id' do
        it "should be bad request" do
          delete 'destroy', id: 'invalidid', name: 'jiro', format: 'jpg'
          response.should be_bad_request
        end
      end
    end
  end
end
