Healthify Front-End Engineer Coding Challenge
=============================================

Hello there! We're excited to have you try out our code challenge. This challenge is based on some
problems we've faced in real-life at Healthify, so it should give you a good introduction into Healthify's
domain and problem space. Below, you'll find information on the context of this challenge, the tasks we'd like
you to complete, and instructions for setting up this repo.

While completing this challenge, please be mindful of a few of our practices:

* We have a guide for styles and conventions, forked from thoughtbot's, that we adhere to. Please keep these in mind
when contributing to this repo. https://github.com/healthify/guides
* Everything we do is tested. We have included some tests in this repo and expect your contributions to be tested
as well. Also, if you think we're missing any tests, please add them!
* We have included some guidelines below for how we will evaluate this assignment so that you know what we're
expecting.

## Context
One of Healthify's main products is a platform that enables our users (primarily social workers)
to search for and view Organizations  – homeless shelters, food pantries,
substance abuse clinics – and their Services for their patients. In this coding challenge, we've
built a minimal aspect of that platform; the app currently provides a API for Organization
index, show, and create actions and for nested Service create and index actions.

Your challenge is to build a single page app that enables provides the user some basic
interfaces for viewing, creating, and destroying these resources as specified in the
following user stories.

## User Stories

### Create
1. As a user on the organizations index page, I may add an organization
by entering a name, address, and description.

2. As a user, I may not create an organization unless 
the name and address are entered.

### Read / Relations
3. As a user, I can see a list of all organizations in the system.
4. As a user, I can click on an organization to see its details: name, description, and address.
5. As a user, I can add services to an organization via the organization details view.

### Delete
6. As a user, I can delete an organization via the organization details view.

### Null state
7. As a user, if there are no organizations I will see a message that says "No organizations! Try adding some above."

## Constraints

1. As mentioned above, the app must be a single page app; all interactions should be processed client-side.
2. It is important that it be easy for us to setup and run your submission. Consequently, we limit the use
of javascript frameworks to Ember or React. Further, for dependencies your submission requires, please
the README and/or `bin/setup` script to make as easy as possible for us to complete installation.

## Mockup Details
For this part of the challenge, we want to see your ability to accurately
reproduce details from a mockup and infer how other views or features should look based on the
provided mockup. You can use your best judgement for any aspect of the mockup not shown
(e.g hover states, error messages).

#### Fonts
The only font used is San Francisco with various weights. Please use this font
and specify any other native fallback fonts that you think are appropriate.


## Dev Setup
Complete the following to get the existing application API up and running.

1. `git clone` down this repository.
2. Install dependencies and setup DB by running the setup script: `bin/setup`.
3. Start the local server: `bundle exec rails server`.
4. Visit 'localhost:3000' in your web browser of choice.

## Tests
This codebase comes with some rspec tests for the existing functionality. Be sure to include tests with your work,
and feel free to add any tests you think we're missing.

Execute `rake` to run the test suite.

## Other Things To Consider
1. `git` history: A consistent and accurate git history greatly aids in the code review process -
which is core to Healthify's technical workflow.

2. Clarity & Documentation: Your code should be expressive and understandable. Solid unit tests usually
provide enough documentation, but aren't always sufficient. Whether via tests, comments, exceptionally
expressive code or all of the above, make sure you submit easy-to-understand code!

3. Questions/Concerns/Roadblocks: While we've attempted to minimize unclear requirements, there's the
possibility that you might have a question about the desirable behavior for some functionality. Where possible,
please make and document in the Git history any product assumptions you made. We won't count any "incorrect"
product assumptions against you as long as they are well communicated.

## How this challenge will be evaluated

1. **Did the candidate meet all the basic requirements?** Does the most essential functionality
(adding and deleting organizations and adding services) work completely and is it tested?
Does the UI match the provided mockup?

2. **Did the candidate meet the basic requirements with excellent work?** How
well-factored, clean, readable, DRY, and performant is the code? Is the business logic in the appropriate
places (e.g. models, views, controllers, stylesheets, etc.)? Are the tests
excellent (clean, readable, etc.) or merely decent? Is the UI responsive, written with minimal CSS and
following best practices?

Please note that for moving candidates forward in our process, we're looking for both 1 and 2 here.
