# Panda Blog

This project is a SPA developed that connects with [jsonplaceholder API](https://jsonplaceholder.typicode.com/) and brings `posts` and `users` slices that are persisted and managed by a redux store.

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

<br><br>
#### Notes:
**#1** App can be access using users from the API (email + and any password) or _new registered users_ (email + password). <br>
**#2** Posts created by _new registered users_ that are updated in local storage, but it's totally normal to give an err from API, because the API that fakes the PUT method, doesn't recognize the new created users' id as valid. <br>




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


#### Unit Testing

1. To run

   ```
   yarn test
   ```

