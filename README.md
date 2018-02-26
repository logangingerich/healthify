Healthify Front-End Engineer Coding Challenge
=============================================

#### A React client built to interact with the Healthify Rails API.

## Dev Setup
Complete the following to get the Rails API and React client up and running.

1. `git clone` down this repository.
2. Install dependencies and setup DB by running the setup script: `bin/setup`.
3. Run `cd client && npm install && cd ..` to install dependencies for the
React client.
3. Start the local server: `bin/rake start`
4. Visit 'localhost:3000' in your web browser of choice.

## Tests
1. Execute `rake` to run the RSPec test suite for the Rails API.
2. Execute `cd client && npm test` to run test suite for React client.

## Completed User Stories

### Create
1. Users can add an organization by entering a name, address, and description
on the organization index page and submitting the form.

2. An organization will not be successfully created unless the name and
address are entered.

### Read / Relations
3. Users can see a list of all organizations in the system.
4. Users can click on an organization to see its details: name, description, and address.
5. Users can add services to an organization via the organization details view.

### Delete
6. Users I can delete an organization via the organization details view.

### Null state
7. If there are no organizations, Users will see a message that says
"No organizations! Try adding some above."
