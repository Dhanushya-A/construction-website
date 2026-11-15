# Construction Website

## 1. Project Overview

A modern, responsive construction company website developed to showcase construction services, company information, completed projects, and building material products.

The website provides a user-friendly interface with responsive layouts, reusable components, product browsing, and account authentication.

### Main Features

- Responsive homepage and navigation.
- Company overview and about section.
- Construction services and project showcase.
- Process and feature sections.
- Client testimonials.
- Contact and quotation sections.
- Product catalog and product details.
- Shopping and wishlist functionality (where implemented).
- User registration and login using Firebase Authentication.
- Password reset functionality.

## 2. Technology Used

The project is developed using the following technologies:

- **React** – Building reusable user interface components.
- **TypeScript** – Type-safe application development.
- **Vite** – Development server and build tool.
- **TanStack Router** – File-based application routing.
- **Tailwind CSS** – Utility-first styling.
- **CSS** – Custom styling and responsive layouts.
- **Firebase Authentication** – User authentication.
- **shadcn/ui** – Reusable UI components.
- **Lucide Icons** – Interface icons.
- **Git and GitHub** – Version control and source code management.

## 3. Installation Instructions

### Prerequisites

Install the following before running the project:

- Node.js (LTS version recommended).
- npm (included with Node.js).
- Git.
- Visual Studio Code (recommended).

### Clone the Repository

```bash
git clone https://github.com/Dhanushya-A/construction-website.git
```

### Navigate to the Project

```bash
cd construction-website
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root and configure your Firebase web application credentials:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

Replace the placeholder values with your Firebase project configuration.

Never upload `.env.local` or private credentials to GitHub.

## 4. Development Command

Start the local development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal to view the website.

## 5. Build Command

Create an optimized production build:

```bash
npm run build
```

The production files will be generated in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## 6. Deployment Instructions

The project can be deployed using platforms such as Vercel or Netlify.

### Deploy using Vercel

1. Push the project to GitHub.

2. Open [Vercel](https://vercel.com/).

3. Sign in and import the GitHub repository.

4. Select the project repository.

5. Configure the build settings:

   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Add the required Firebase environment variables in the Vercel project settings.

7. Deploy the application.

For Firebase Authentication, add the deployed website domain to Firebase Authentication's authorized domains.

## 7. Dependencies

The project uses npm packages for frontend development, routing, styling, authentication, and UI components.

Major dependencies include:

- React
- React DOM
- TypeScript
- Vite
- TanStack Router
- Firebase
- Tailwind CSS
- shadcn/ui and related UI packages
- Lucide React

Development dependencies include tools for TypeScript, linting, testing, and building the application.

The complete and exact dependency list is available in `package.json`.

Install all dependencies using:

```bash
npm install
```

## 8. Assumptions

- Users have Node.js and npm installed.
- The application is intended to run in a modern web browser.
- Firebase Authentication requires a valid Firebase project configuration.
- Environment variables are configured separately for local development and production.
- Internet connectivity is required for Firebase services and externally hosted resources.
- The application is primarily designed for desktop, tablet, and mobile devices.
- Product information and images are maintained within the project unless connected to an external backend.

## 9. Known Limitations

- Firebase authentication requires valid project credentials and authorized domains.
- Features that require a backend database or payment gateway need additional integration if not already implemented.
- Product information may be static if no product management backend is configured.
- Local development environment variables must be configured separately on deployment platforms.
- Performance may depend on image sizes, network connectivity, and external services.
- Some third-party integrations may require additional configuration before production use.

---

## Author

**Dhanushya A.**

