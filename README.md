# Dynamic Web TWAIN with Angular
The sample shows how to integrate Dynamic Web TWAIN JavaScript library into an Angular project.

## How to Run
1. Install [Node.js](https://nodejs.org/en/) if it's not installed yet

2. Install **Angular CLI** if it's not installed yet

    ```bash
    npm install -g @angular/cli
    ```
3. Install packages

    ```bash
    npm install
    ```

4. Request a Dynamic Web TWAIN trial license [here](https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx) and update the license in the file `app.component.ts` on the follwing line (replace **A-Valid-Product-Key**)

    ```typescript
    Dynamsoft.WebTwainEnv.ProductKey = "A-Valid-Product-Key";
    ```

5. Run the app

    ```bash
    ng serve --open
    ```

6. Open **http://localhost:4200/** in **Chrome**

## Blog
[Using JavaScript Global Library in Angular CLI Application](https://www.codepool.biz/javascript-global-library-angular-cli.html)

------------------

# AngularCliApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
