# Just-Another-Blogsite

A RestAPI implementation of a blog site that supports authentication and authorization and can provide response data in a variety of formats with content-negotiation. This is a ReactJS-based frontend of this application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project Structure

    ├── public/
    ├── src/
      ├── assets/
        ├── images/
          ├── loginpic.svg
          ├── logo-jab.png
          ├── signuppic.svg
      ├── components/
        ├── pages/
          ├── Home.js
          ├── Login.js
          ├── NotFound.js
          ├── Profile.js
          ├── ProfileUpdate.js
          ├── Signup.js
          ├── StoryDetails.js
          ├── StoryPost.js
          ├── StoryUpdate.js
        ├── Account.js
        ├── App.js
        ├── Button.js
        ├── ButtonDelete.js
        ├── ButtonProfileDelete.js
        ├── ButtonProfileUpdate.js
        ├── ButtonUpdate.js
        ├── FloatingButton.js
        ├── Form.js
        ├── Illustration.js
        ├── Layout.js
        ├── Loader.js
        ├── LoginForm.js
        ├── ModalConfirmation.js
        ├── Nav.js
        ├── Pagination.js
        ├── PrivateRoute.js
        ├── PublicRoute.js
        ├── SignupForm.js
        ├── Stories.js
        ├── Story.js
        ├── TextInput.js
        ├── UserSpecificStories.js
        ├── Users.js
      ├── contexts/
        ├── AuthContext.js
        ├── StoryContext.js
        ├── UserContext.js
      ├── styles/
        ├── Account.module.css
        ├── App.css
        ├── Button.module.css
        ├── ButtonDelete.module.css
        ├── ButtonProfileDelete.module.css
        ├── ButtonProfileUpdate.module.css
        ├── ButtonUpdate.module.css
        ├── FloatingButton.module.css
        ├── Form.module.css
        ├── Illustration.module.css
        ├── Layout.module.css
        ├── Login.module.css
        ├── ModalConfirmation.module.css
        ├── Nav.module.css
        ├── NotFound.module.css
        ├── Pagination.module.css
        ├── Profile.module.css
        ├── ProfileUpdate.module.css
        ├── Signup.module.css
        ├── Stories.module.css
        ├── Story.module.css
        ├── StoryDetails.module.css
        ├── StoryPost.module.css
        ├── StoryUpdate.module.css
        ├── TextInput.module.css
        ├── Users.module.css
      ├── index.js
    ├── package-lock.json
    ├── package.json
    

1.  **`public/`**: This directory contains public files including images and text files.

2.  **`src/`**: This directory contains all the source codes.

3.  **`assets/`**: This directory contains all the assets needed including images.

4.  **`images/`**: This directory contains all the images. 

5.  **`components/`**: This directory contains all the components.

6.  **`pages/`**: This directory contains all the page components.

7.  **`contexts/`**: Contains `Authenication Context`, `Story Context`, and `User Context` APIS.

8.  **`styles/`**: This directory contains css styles for the components.

9.  **`index.js`**: This file is the parent component.

10.  **`package.json`**: This is the main configuration file for for this app.

11.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
