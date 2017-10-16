require 'rails_helper'

RSpec.describe Service, type: :model do
  it { should belong_to(:organization) }

  it { should validate_presence_of(:name) }
end
