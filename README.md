# Cleverpy Blog

This project is a SPA developed in the scope of [Cleverpy](https://cleverpy.com/)'s hiring process that connects with [jsonplaceholder API](https://jsonplaceholder.typicode.com/) and brings `posts` and `users` slices that are persisted and managed by a redux store.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Testing](#testing)
  
## Installation

##### Clone the repository:

```
https://github.com/cleverpy-technical-test/frontend-pablo-marconi.git
```

##### Install dependencies:

Recomended yarn to avoid deps issues.

```
yarn
```

## Usage

#### 1. Start the application:

```
yarn run dev
```

#### 2. Open the application in browser

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser to view the application.



https://github.com/cleverpy-technical-test/frontend-pablo-marconi/assets/89553724/81845e0f-1d2c-474a-839e-31cb6f7fa6b3

<br><br>
#### Notes:
**#1** App can be access using users from the API (email + and any password) or _new registered users_ (email + password). <br>
**#2** Posts created by _new registered users_ that are updated in local storage, but it's totally normal to give an err from API, because the API that fakes the PUT method, doesn't recognize the new created users' id as valid. <br>
![Screenshot 2024-04-18 at 4 27 41 PM](https://github.com/cleverpy-technical-test/frontend-pablo-marconi/assets/89553724/751e609b-82fd-44f3-8fa6-7aa69a6493d3)



## Folder Structure

The project's folder structure is the following

root/**cypress** e2e testing <br>
root/**src** <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/componets** _all components' tsx and test.tsx files_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/context** _auth and error handling contexts_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/hooks** _store CRUD hooks that connect with services_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/interfaces** _main types from project_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/services** _api connection CRUD_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/store** _redux store_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/styles** _SASS stlyles_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**/utils** _utilities and helpers_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**App.tsx** _Application root file_ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**AppRouter.tsx** _Application Router_ <br>


## Testing

This project has two different types of tests:

#### E2E Testing with cypress

To run this tests:

1. Temporally comment this param from `tsconfig.ts`

![image](https://github.com/cleverpy-technical-test/frontend-pablo-marconi/assets/89553724/115f057f-2ee9-465a-a83f-e20940f3dd30)

2. Run this command

   ````
    yarn cypress:open
   ````

3. Look and run `frontend-pablo-marconi/cypress/e2e/cleverpy_posts.cy.js` using Cypress

![image](https://github.com/cleverpy-technical-test/frontend-pablo-marconi/assets/89553724/0108fab2-9cf0-4cc0-bbc7-b67a879bd468)

#### Unit Testing

1. To run

   ```
   yarn test
   ```
**IMPORTANT!** After installing Cypress react-scripts started having conflicts with Jest and Test run started to fail. <br> I tried to debug it, did great research on it, but couldn't fix it. <br><br>
Nevertheless, you can run and see passing unit tests using on-progress-work branch: `CP-6_unit-tests`. <br> This branch is available to be restored in the following PR:
```
https://github.com/cleverpy-technical-test/frontend-pablo-marconi/pull/7
```

