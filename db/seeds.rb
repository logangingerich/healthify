organization_seeds = [
  {
    name: "First Presbyterian Church of Brooklyn",
    address: "124 Henry Street, Brooklyn, NY 11201",
    description: "Congregation of different races, ethnicities, nationalities, ages, sexual orientations, marital statuses, professions, incomes and abilities that reflect and honor that diversity.",
    services: %w(Homeless\ Shelter Housing Immigration\ Services Rehabilitation),
  },
  {
    name: "Broadway United Church of Christ",
    address: "124 Goss Street, New York, NY 10001",
    description: "LGBT-affirming congregation of United Church of Christ, 5pm Sunday worship service, followed by dinner. All welcome.",
    services: %w(Free\ Food LGBT\ Services Homeless\ Shelter),
  },
  {
    name: "Callen-Lorde Community Health Center",
    address: "356 W. 18th St., 2nd floor, New York, NY 10011",
    description: "Services targeted at New York’s LGBT communities, including: case management, primary medical care, HIV testing, health, Health Outreach to Teens (HOTT) program ages: 13-24. Free sexual and reproductive health services including: condoms, birth control, emergency contraception, STD testing and treatment, HIV testing, pregnancy testing, and mental health counseling.",
    services: %w(Trans\ Legal\ Services STD\ Testing HIV\ Testing HOTT Mental\ Health\ Services Contraception STD\ Treatment),
  },
  {
    name: "Greenwich Village Youth Council's Neutral Zone",
    address: "2273 Third Avenue, New York, NY 10035",
    description: "Safe space for LGBTQ youth to drop in and hang out, socialize, enjoy activities. Also homeless or at-risk services.\r\n",
    services: %w(),
  },
  {
    name: "HIV Law Project",
    address: "15 Maiden Lane, 18th floor, New York, NY 10038",
    description: "Services for HIV+ Bronx and Manhattan residents, including: housing, immigration, benefits, and healthcare. Bilingual English/Spanish.",
    services: %w(ESL\ Courses Immigration\ Law Free\ Health\ Services),
  },
  {
    name: "Jan Hus Presbyterian Church",
    address: "351 East 74th street, New York, NY 10021",
    description: "Public program providing women and their children (ages 0-13) who have experienced domestic violence in their home with bilingual (English/Spanish) mental health services.",
    services: %w(Childcare Domestic\ Abuse\ Shelter ESL\ Courses),
  },
]

organization_seeds.each do |org_seed|
  service_seeds = org_seed.delete(:services).to_a
  organization = Organization.create!(org_seed)

  service_seeds.each do |service_name|
    organization.services.create!(name: service_name)
  end
end
