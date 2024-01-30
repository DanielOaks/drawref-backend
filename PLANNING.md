# DrawRef

This is a webapp that holds and presents images, for drawing reference. I'm building this app to learn how new backend and front-end technologies work.

Here's where we'll be doing the planning and all.

## Initial definitions

- **Audience:** Artists are the main users of this app.
  - **Tech-saviness:** Users won't be tech-savvy, keep it simple.
  - **Time spent on the app:** For every couple minutes on the selection side, maybe fourty minutes on the image presentation side.
  - **Environment:** The app likely won't be their main focus. They'll use it as a companion while drawing, off to the side. Could be on a mobile or desktop device.
- **Use:** Click on a category, and see images from that category presented in a format similar to a life-drawing session.
- **Technology:**
  - **Frontend:** React. Maybe TailwindCSS.
  - **Backend:** Express.js.
  - **Database:** Postgres.
  - **Login:** SSO with various services, not needed to access the site.

## Research

### Questions

Most of the answers are based on my expectations as an artist who uses these tools.

---

_What similar existing software/sites exist?_

- http://reference.sketchdaily.net
- https://line-of-action.com
- https://quickposes.com/en

---

_What functionality is expected?_

- Selecting a category of picture (human, hands, animals, vegetation, etc).
- Choosing one or more specific sub-categories within each (nude, clothed, avian, seated, etc).
- Choosing the interval that each picture's displayed for (10s, 30s, 2m, 60m, etc).
- Choosing the same interval for all pictures, or a session-like interval (start at a short amount of time per picture, slowly build up to half an hour or an hour per picture).
- Know where each picture comes from / having images be referenced appropriately.

---

_What pain points exist with the existing tools?_

- Can't add your own images or references.
- Class-like intervals are very useful, but not always supported.

### Audience

Admin users generally understand self-hosting, Docker images, importing content, and are tech-savvy.

Users are artists, may not be familiar with tech or the web, and are simply looking to draw with some references.

## Key features and functionality

- Admin
  - **Categories**
    - Create a category.
    - Edit the metadata for a category (nude/clothed, type of pose, type of animal, etc).
  - **Images**
    - Import one or more images from a local directory, with default credit/metadata.
    - Upload one or more images, with default credit/metadata.
    - Bulk edit the categories/metadata of images.
    - Bulk remove images from the site.
- User
  - **Authentication**
    - Register with SSO.
    - Login with SSO.
  - **Drawing session**
    - Select category and metadata, or favourites.
    - Select image intervals (including class-like session).
    - Start session.
    - Pause and resume session.
    - Favourite images.
  - **Misc**
    - See favourited images.

## Pages

MVP:

- Selection page: Select category, images, and timing. Is the landing page.
- Image page: Display the current image.
- Register/Login page: Login via SSO. Account is auto-created if it doesn't exist.
- Admin dashboard: Modify available categories and images.

Extra:

- Favourites page: Lists the user's favourite images.
- About page: Has info about the site and project.
- Credits page: Has info about where the images are from.

## API

### Upload API

The Upload API lets admins upload images, which returns temporary image IDs, which should then be provided in image upload/creation calls on the User API.

- `/image` `POST`: Upload an image.
- `/bulk/image` `POST`: Upload multiple images.

### User API

The User API lets you create and edit categories, upload images, and favourite images.

- Authentication
  - SSO login via OAuth, done through redirections to/from frontend.
  - Retrieved token is used as HTTP Bearer auth.
- Session
  - `/session` `GET`: Get set of images for a session.
- Categories
  - `/categories` `POST`: Create a category.
  - `/categories` `GET`: Get all categories.
  - `/categories/{id}` `GET/PUT/DELETE`: Get, edit, or delete a category.
  - `/categories/{id}/image/{image}` `GET/PUT/DELETE`: Adds, gets, edits, or removes the given image from the given category.
- Images
  - `/image` `POST`: Upload an image.
    - Provide either random image ID returned by the Upload API, or external URL.
  - `/image/{id}` `GET/PUT/DELETE`: Get, edit, or delete an image.
  - `/image/{id}/fave` `POST/DELETE`: Make this image a favourite, or un-favourite it.
  - `/bulk/images` `GET/POST/PUT/DELETE`: Bulk get/upload/edit/delete images.
  - `/fave/images` `GET`: Get all favourited images.

## Sample data

I'm lucky enough to be able to bundle some sample images with this app – have reached out to a few people who take reference images and they've allowed me to include them.

However, this means we need to ask the question: How and where should we store sample data? The sample images have categories and tags associated with them, and those categories with those tags should exist before the sample images are imported.

Today, the category templates are stored on the frontend repo, and it may make sense to have the category templates and sample data stored in one place... Let's have a think about this.

### Possible approaches

- Keep all data on Backend.
  - Easy to copy all sample data to the `FINAL_UPLOAD_PATH`.
  - Import process can be one API call to the backend, simple from the frontend.
  - Need to expose category templates via the API.
- Keep all data on Frontend.
  - When importing sample data, need to upload every image separately.
  - More risk of sample data import failing during this process.
  - Category templates are embedded, can just import them.
- Keep some data on both sides.
  - Worst option, super easy for them to become out of sync if the backend and frontend version don't match exactly.

With the above in mind, it makes the most sense to keep all sample data and category templates on the backend. I'll start the process for moving the category templates over.

## Mockups

### Initial sketches

![Rough page flow plans](docs/planning_page_flow.jpg)

![User page wireframes](docs/planning_pages_1.jpg)

### Version 1

<p align="center">
  <img alt="Light" src="docs/mockup-v1-sel1.png" width="45%">
  <img alt="Dark" src="docs/mockup-v1-sel2.png" width="45%">
</p>

### Version 2

<p align="center">
  <img alt="Light" src="docs/mockup-v2-sel1.png" width="45%">
  <img alt="Dark" src="docs/mockup-v2-sel2.png" width="45%">
  <img alt="Light" src="docs/mockup-v2-session.png" width="45%">
  <img alt="Dark" src="docs/mockup-v2-login.png" width="45%">
</p>

### Logo

![Logo sketches](docs/logo-sketches.png)

![Logo](docs/logo.svg)
