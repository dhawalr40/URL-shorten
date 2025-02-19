class Api::V1::LinksController < ApplicationController
  def create
    og_url = params[:original_url]
    raise StandardError.new "Url cant be Blank" if og_url.blank?
    raise StandardError.new "Invalid Url" unless valid_url?(og_url)
    link =  Link.new(original_url: og_url)
    link.save!
    render json: { short_url: short_url(link.short_code) }, status: :created
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def links
    links = Link.all.as_json(only: [:original_url, :short_code])
    render json: { links: links }, status: 200
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def show
    link = Link.find_by(short_code: params[:short_code])
    render json: { error: "Link not found" }, status: :not_found if link.blank?
    redirect_to link.original_url, allow_other_host: true
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def link_params
    params.require(:link).permit(:original_url)
  end

  def short_url(short_code)
    "#{request.base_url}/#{short_code}"
  end
  def valid_url?(url)
    require 'uri'
    uri = URI.parse(url)
    uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
  end
end
