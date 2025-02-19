class Link < ApplicationRecord
  validates :original_url, presence: true, uniqueness: true
  validates :short_code, uniqueness: true
  before_create :generate_short_code
  private

  def generate_short_code
    self.short_code = SecureRandom.uuid[0..6]
  end
end
