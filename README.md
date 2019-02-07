# cocktail_app
This is an app for a cocktail subscription service.
---
# Readme Content

- URL to our App:

[Our Published App](https://nervous-mestorf-14ea21.netlify.com/)

- A link to our GitHub repository

[Our GitHub Organization](https://github.com/Cocktail-Subscription-Application/cocktail_app)

## Description of your project, including:
1. Problem definition / purpose:

    The organization that we are builing our application for is called Bottle Batched. A cocktail subscription service that allows users to sign up for a monthly or quarterly delivery of pre-mixed bottles of specified cocktails at a significant saving compared to bar prices and convenience as all they need to do is pour and perhaps add a garnish.

2. Functionality / features:

    This applications highlight features are Stripe integration with subscription functionality and the ability to manage the subscriptions via changing the frequency and the ability to pause whilst retaining all user information. The site also has an admin dashboard area where they can add cocktails that are to be included in the monthly rotation, the admin dashboard feeds directly into the app database. Users have the ability to see past orders and update their payment and delivery details in their own user dashboard. The front end of the app features several dynamic pages and responsive elements to user interaction.

3. Screenshots:

    ![Screenshot](/docs/screenshot.png)

4. Tech stack (e.g. html, css, deployment platform, etc):

    MongoDB
    Express
    React
    Node
    Javascript
    HTML
    CSS    
    Now.sh
    Cloudinary
    MLabs
    Netlify
    Stripe

5. Instructions on how to setup, configure, deploy and use your App:

    1. Required software:
        - NodeJS 8.0+ (with NPM)
        - MongoDB (running on localhost, default port)

    2. Once you've installed the software you can clone the repo
        <pre><code>~/ $ git clone git@github.com:Cocktail-Subscription-Application/cocktail_app.git</code></pre>

        <pre><code> ~/ $ cd cocktail_app/frontend && npm install</code></pre>

        <pre><code> ~/ $ cd cocktail_app/backend && npm install</code></pre>

        <pre><code> ~/ $ cd frontend && touch .env.production .env.development && cd ../backend && touch .env now.json</code></pre>
        
        BACKEND

        In the .env created on the backend, incude:

        <pre><code>
        DB_URL=<INSERT YOUR MONGOD:DB INFO>

        STRIPE_SECRET=<INSERT YOUR Sk KEY FROM STRIPE>

        MONTHLY_PLAN=<INSERT THE MONTHLY PLAN ID FROM THE PLAN YOUR CREATED IN STRIPE>

        QUARTERLY_PLAN=<INSERT THE QUARTERLY PLAN ID FROM THE PLAN YOUR CREATED IN STRIPE>
        </code></pre>

        FRONTEND

        <pre><code>
        REACT_APP_DOMAIN=http://localhost:5000

        REACT_APP_STRIPE_KEY=<INSERT YOUR pk KEY FROM STRIPE>
        </code></pre>

        Add the above code into both front end env files - with the exact same information.
        
6. Design documentation including:

    - Design process:

        Our design process was to first work out the user flows as a group and how we wanted our site to function. From this stage we went onto wireframes to get an idea of the basic appearance that we wanted the site to take. Figma was extensively used to get the colour palette of our app decided on based on direction we received from our clients. Eathan then worked on the logo of our site and the general appearance of the pages. We had existing sites that our clients asked us to take inspiration from as well as actual venues.

        ![Figma](/docs/figma.png)

    - User stories:

        - As a new user I need to confirm I am over the age of 18 before proceeding to the homepage so that we comply with Australian Law

        - As a user I want to skip age confirmation and proceed straight to the homepage if I have already viewed the age confirmation in my current session, so that I feel recognized and have a posiutive user experience

        - As a user I want to see the Bottle Batched (Home URL) in the top left hand corner and navigation pane fixed to the top of the site (stays fixed when scroll down the page) with links to the following URLs "How it Works", "Sign Up" and "My Account" so that I can navigate to separate sections of the website

        - As a user I want to see a graphic below the navigation pane that acts as 'homepage' with high level content (see content info) and a link to "How it Works"

        - As a user I want a secondary menu fixed at the bottom of the welcome page with links to "FAQ", "Terms/Privacy", "Contact Us", "How it Works", an instagram icon link to the company handle, and a display of the company liquor license so I can navigate the site more specifically and link out to other content platforms

        - As a user I want to see an image/content below the initial Home Page imagery/graphic illustrating how the service works so that I can understand the value proposition including an icon flow that illustrates the service flow for Bottle Batched

        - As a user I want a link to login/signup after the content on How it works

        - As a user I want some additional information in the "How it works" section

        - As a user I want some additional information in the "How it works" section, underneath the high level icon flow covering "What type of Cocktails?", "What do I receive as part of my subscription?", "How do I prepare the Cocktails?", so that I can understand in more detail the value proposition
        - As a new user, I want to be able to select my preference for frequency of delivery, so that I can choose how often I will receive a delivery

        - As a new user, I want to set a password for my account (user name is email), so that I can log in to my account at a future date

        - As a new customer, I want to receive a confirmation email welcoming me to Bottle Batched and confirming my customer, payment and frequency details, so that I can know my sign up was successful and start to engage with the brand

        - As an existing customer, I want to be able to sign in to my account using my email and password, so that I can access details of my account

        - As an existing customer, once logged in, I want to be able to edit any of my details (name, postal address, date of birth, payment details, billing address) so that I can ensure my details stay up to date

        - As an existing customer, once logged in, I want to be able to reset my password, so that I can change my password to something different if I wish

        - As a new user, I want to enter my customer details (name, email, postal address, date of birth) so that I can sign up as a member

        - As a new user, I want to securely enter my payment details (credit card number, cc expiry, credit card security code, billing address) so that I can sign up as a member

        - As an existing customer, on the login page I want to be able to select ‘Forgot Password?’ so that I can reset my password via a code sent to my email address on my account, so that if I have forgotten my password I am able to reset it

        - As an existing customer, once logged in, I want to be able to change my delivery frequency so that I can change how often I will receive a delivery

        - As an existing customer, once logged in, I want to be able to see the date of my next scheduled delivery or if my subscription is currently paused, so that I know when my next delivery will be

        - As an existing customer, once logged in, I want to be able to pause my subscription, so that I can choose to stop deliveries and payments if I wish

        - As an existing customer, once logged in, I want to be able to see a list of all my previous deliveries (date, contents and access to digital copies of previous recipe cards), so that I can see what my previous deliveries were

        - As an existing customer, I want to be able to invite others to join [COMPANY NAME] which will allow me to receive $10 off my next order if someone subscribes based on my invite, so that I can invite my friends to join and receive a discount on my order

        - As an existing customer, I want to receive a confirmation email when I change any of my personal, payment, or frequency of subscription details, so that I know the change was successful

        - As an existing customer, I want to receive an email 3 business days before my next billing date informing me that the payment will be made, so that I know when my credit card will be charged

        - As a user I want a secondary menu fixed at the bottom of the welcome page with links to "FAQ", "Terms/Privacy", "Contact Us", "How it Works", an instagram icon link to the company handle, and a display of the company liquor license so I can navigate the site more specifically and link out to other content platforms

        - As an owner, I want to have real time information about all subscribers (name, email, postal address, date of birth, delivery frequency, order status, next delivery date) so that I have a record of my customers and their orders

        - As an owner, I want a report to be generated on the first Business Day of the month of all orders due for that month and whether the customer is a new subscriber or existing (i.e. first box or standard box), so that I can manage payments and stock

        - As an owner, I want customers payment details to be stored securely, and have the ability to know who and when to chareg customers, so that i can meet privacy obligations

    - A workflow diagram of the user journey/s:

        ![User flow](/docs/userflow1.png)

        ![User flow](/docs/userflow2.png)

        ![User flow](/docs/userflow3.png)

    - Wireframes:

        ![Mobile Wireframe 1](/docs/mobile-wireframe-1.png)

        ![Mobile Wireframe 2](/docs/mobile-wireframe-2.png)

        ![Mobile Wireframe 3](/docs/mobile-wireframe-3.png)

    -  Database Entity Relationship Diagrams:

        - Cocktail Model

        <pre><code>
            const cocktailSchema = new Schema ({
                title: {
                    type: String,
                    required: true
                },
                photo: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                directions: {
                    type: String,
                    required: true
                },
                ingredients: {
                    type: String,
                    required: true
                },
                available: {
                    type: Boolean,
                    required: true
                },
                availabilityMonth: {
                    type: String,
                    required: true
                }
            })
        </code></pre>

        - User Model

        <pre><code>
            const userSchema = new mongoose.Schema({
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                password: {
                    type: String,
                    required: true
                },
            
                dateJoined: {
                    type: Date,
                    default: Date.now
                },

                stripeId: String,
                
                admin: {
                    type: Boolean,
                    default: false
                },

                selectedOption: {
                    type: String,
                    required: true
                },

                streetAddress: {
                    type: String,
                    required: true
                },
                suburb: {
                    type: String,
                    required: true
                },
                postcode: {
                    type: Number,
                    required: true
                },
                ausState: {
                    type: String,
                    required: true
                },

                orderList: Array,
                paymentSource: Array,
                subscriptionId: String,
            })
        </code></pre>

    -  Data Flow Diagram:

    ![MERN Stack Data Flow](/docs/mern-data-flow.png)


    -  OO design documentation:

    <pre><code>
        /
        -- /backend/
            /config/
                /cloudinary.js
                /passport.js
                /stripe.js
            /controllers/
                /protected/
                    /admin/
                        /cocktails.js
                        /users.js
                    /user/
                        /cards.js
                        /orders.js
                        /subscriptons.js
                        /userDetails.js
                /public/
                    /auth.js
                    /payments.js
                index.js 
                public.js
                payments.js
            /models/
               /Cocktail.model.js
               /User.model.js
            api.js
            package.json
        -- /frontend/
            /src/
                /components/
                    /protected/
                        /Admin/
                            /Admin.css
                            /Admin.js
                            /AdminSidebar.css
                            /AdminSideBar.js
                            /AdminUserChart.js
                        /Users/
                            /Cards/
                                /CardUpdate.js
                            /PersonalDetails/
                                /PersonalDetails.js
                            /Subscriptions/
                                /AddSubscription.js
                                /RetrieveSubscription.js
                                /Subscription.js
                                /UpdateSubscription.js
                                /UpdateToMonthly.js
                                /UpdateToQuarterly.js
                            /ListCustomerCharges.js
                            /UpdateDetails.js
                            /UserProfile.css
                            /Userprofile.js
                    /public/
                        /About.js
                        /CocktailHome.js
                        /ContactUs.js
                        /Faqs.js
                        /Footer.js
                        /Form.css
                        /Frequency.js
                        /Home.css
                        /Home.js
                        /HowItWorks.js
                        /...etc
                    /Cocktail.js
                    /Cocktails.css
                    /Cocktails.js
                    /CreateCocktails.js
                    /Customers.css
                    /Customers.js
                    /Subscription.js
                    /UserProfile.js
                App.css
                App.js
                App.test.js
                index.css
                index.js
                serviceWorker.js
            package.json
        -- /docs/
        -- /README.md
</code></pre>

7. Details of Project Management & Planning process including:

    -  Client communications:

        - We had an initial meeting with our client where they laid out their requirements and we discussed general features of the app and how they would fit in with our project requirements. The client then sent us user stories and a colour palette for us to work off.
        We had a Slack workspace with our clients where we would communicate and provide regular updates.

        ![Slack Workspace](/docs/slack-workspace.png)

    -  Screenshots of Trello board(s):

        ![GitHub Project Board](/docs/github-project-board.png)

    -  Answers to the Short Answer questions (Section 2.2):

        - What are the most important aspects of quality software?

            The most important aspects of creating quality software, is to ensure the User has a good experience. The UX needs to be smooth without any bugs, and the UI needs to be clean and readable. This ensures a user can use your software eaily.
            The characteristics that ensure quality software are:
            maintainability, correctness, reusability, reliability, portability, and efficiency.

            Another important part of quality software is effective and DRY (Don't Repeat Yourself) code, this increases efficiency in the building process but also makes the code much more legible and easy to maintain in the future.

        - What libraries are being used in the app and why

            bcrypt - Bcrypt is a Node package that is used for encryption of sensitive user information such as passwords. Brcypt will take whatever information has been specified for encyrption and turn it into a hash so it cannot be read. Bcrypt also has a compare function so that if the user enters the same password when logging back in if the hashed password they enter matches the one on file they will be granted access.

            cloudinary - Cloudinary is an cloud image hosting service that allows developers to host images for their website outside of its database. This is especially useful when using a document based database such as MongoDB and helps spread storage requirements across several different locations. We used this so we could include images of the drinks on our website that also fit in with our database requirements.

            cors - Cors (Cross Origin Resource Sharing) is used to allow our application to retrieve resources from different sources. As our front and back end are split up we require cors to stop the browser throwing a single origin resource error.

            dotenv - Dotenv is package that allows us to store environment variables in one secure location. Specific routes for the database and various hosting services as well as usernames and passwords to access those services can be stored in the .env file and we can then also ignore the .env file in our git repository so that this information is not compromised.

            express - Express is a framework for Node that is used to handle requests to a server, by giving the ability to write functions with 'req' and 'res' based on requests for specific paths and the ability to quickly define which port the app is to handle requests from.

            jsonwebtoken - Jsonwebtoken is used to store use sessions. Once a user has successfully logged in we are able to store their 'session' for a chosen period of time so they they don't always have to log back in to the website whenever they return. We used this to provide a convenient user experience.

            mongoose - Mongoose is a package that allows us to use mongoose syntax within our code to connect to our database and use functions to do things such as save data to our database and retrieve it.

            multer - Multer is a javascript middleware package that helps with uploading files. We are using this for our image upload when the admins create a new cocktail and the image is uploade to Cloudinary.

            passport - Passport is a package which allows us to authenticate requests, once said request is authenticated we are then able to declare what is to happen, for example if a user tries to access a page that is admin only or what happens once they log in.

            passport-jwt - Passport-jwt is a package that allows us to use Passport to authenticate user sessions using Javascript Web Tokens as authentication that can be written as part of our passport strategies.

            passport-local - Passport-local is a package that allows us to write a strategy to authenticate the username and password.

            stripe - The stripe package gives us access to the stripe API allowing us to implement stripe payment within our application.

            axios - Axios is a package that assists with HTTP requests using promises and assists with asynchronous requests that can be used to perform CRUD operations. Allowing us to write routes so admins can perform tasks such as edit, create and delete cocktails.

            js-cookie - A package that allows us to manage cookies for our user sessions. It gives us the ability to determine how long a user cookie is to be valid and under which conditions it will be deleted.

            react - React is one of the most popular packages for creating user interfaces. Its dynamic ability allows it to 'react' and update based on user inputs without having to reload an entire page, and for the page to change based on a state such as the user being signed in or not.

            react-burger-menu - React-burger-menu is a simple package that allows us to include a 'burger' icon for our side menu, this is commonly used especially on mobile sites and when clicked it includes a smooth transition which brings the menu into view.
        
            react-stripe-checkout - React-stripe-checkout gives the ability to implement a checkout button as part of the implementation of stripe so that it takes the user directly to the stripe details element where they can enter their card details and purchase an item or in our case sign up to the subscription service.


        - A team is about to engage in a project, developing a website for a small business. What knowledge and skills would they need in order to develop the project?

            ** A team about to engage in such a project will require the following skills:

            - The ability to code, and understand coding guides/documents
            - Project management - The team would be well served by incorporating project management tools such as daily stand ups, tracking of tasks, who is carrying them out and what is to be prioritised.
            - Working as a team, being able to collaborate and work with others, the ability to ask for help when required and assess how much time is being spent on a particular task.

        - Within your own project what knowledge or skills were required to complete your project, and overcome challenges?

            - Analytical thinking
            - Problem solving
            - Fitting code examples to your own requirements
            - Persistence
            - Collaboration

        - Evaluate how effective your knowledge and skills were this project, using examples, and suggest changes or improvements for future projects of a similar nature?

            As a group we had a good combination of skills to accomplish the various things that were required to fulfill our requirements. Some were stronger in front end, some in back end and some good at finding solutions to the more complex problems, as a whole we worked together well and learnt a lot from the entire project time. If we were to work on another project again we could benefit from spending some more time with wireframes and user walkthroughs. Consistent stand ups daily would have assisted with the workflow of the group as well as discussions about what was going to be tackled, why and how it fitted into the requirements of the project. 

Thank you for reading about our app!

Created by GAEL (Guy, Anhar, Eathan & Laurence) @ CoderAcademy