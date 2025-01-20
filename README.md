# OCCAMLAB

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.7.

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

Third-Party Libraries Used

Here is a list of third-party libraries used in this project and their purposes:

1. Angular: The core framework for building the application. It provides a structure for organizing components, services, and routing.
2. html2canvas: A library used to capture a screenshot of a DOM element and convert it into a canvas image. This is used for saving content as images in the app.
3. @angular/forms: Provides support for building forms in Angular, including reactive forms and template-driven forms.
4. @angular/common: Common utilities and services used across the Angular application, such as HTTP client and routing.
5. rxjs: A reactive programming library for handling asynchronous events and data streams used throughout the application for managing data flow.
6. Karma: Used for unit testing the application, Karma is a test runner for JavaScript that works well with Angular.

Known Limitations or Areas for Improvement

1. Error Handling in API Calls: The current error handling only shows an alert for failed submissions. It would be beneficial to implement a more robust error handling system with user-friendly error messages directly in the UI.
2. Performance Optimization: The application could benefit from performance improvements in areas like large form handling. This could be done by lazy loading components or optimizing change detection in Angular.
3. End-to-End Testing: While unit tests are implemented, end-to-end (e2e) testing is not fully set up in the project. Adding e2e tests with a framework like Protractor or Cypress would help ensure the app works as expected in a real-world scenario.
4. Mobile Responsiveness: The mobile responsiveness of some components could be improved, especially for forms with complex layouts. This might require additional media queries and testing on various devices.
