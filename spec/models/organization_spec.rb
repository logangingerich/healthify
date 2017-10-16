require 'rails_helper'

RSpec.describe Organization, type: :model do
  it { should have_many(:services).dependent(:destroy) }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:address) }
end
