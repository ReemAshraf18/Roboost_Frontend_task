# EcommerceApp

📦 Features
User authentication (fake login with dummy token).

Auto logout after token expiration (24h).

Product listing with server-side pagination.

Product details view.

Shopping cart with quantity control.

Category-based filtering.

Language switcher (English / Arabic).

Header search with navigation.

Protected routes using AuthGuard.

Signals for reactivity without page reload.

Caching responses for better performance.

Carousel and styled UI with Bootstrap.

🧠 Assumptions Made
We're simulating authentication by fetching users from DummyJSON and storing a fake token in localStorage.

Since the API is fake, no actual payment or order processing is implemented.

User profile editing and registration are not fully implemented due to API limitations.

🚀 Additional Features Implemented
Token expiration: The app auto-logs out after 24 hours.

Auth Signal State: Header updates dynamically without needing refresh.

Custom pipes: Used for price formatting and (optionally) category display.

Pagination and Limit Controls: Fetching products in chunks (8 or 30 at a time).

Cart Total Calculation using Signals.

Animations & Carousel Styling using Bootstrap 5.
🛠️ Approach Explanation
The project is structured using feature modules for scalability and separation of concerns. Services (like ProductService or AuthService) communicate with the DummyJSON API using HttpClient.

Signals:
We used Angular Signals (signal, computed) instead of RxJS where possible to benefit from:

Simpler reactivity

Better change detection

Cleaner templates

Authentication:
On login, we:

Generate a fake token

Store token and user in localStorage

Save expiration time

Setup auto logout via setTimeout

The app reacts to login state immediately using signals (without refreshing).

Cart:
Cart state is reactive. Quantity changes update totals immediately using Signals and local caching.

📩 Feedback or Suggestions
Feel free to open an issue or contact the developer if you want to contribute or suggest improvements.
































This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
