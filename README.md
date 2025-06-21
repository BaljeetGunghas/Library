# Library Reservation System

A modern, responsive React/Next.js project to browse and reserve books online.  
Features include book browsing, filtering, detailed modal views, reservation system with expiry, user login, and mobile-friendly navigation.


## Live Link 
🚀 Live Demo
🟢 View the live website here:
👉 https://liberary.netlify.app/


## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Components](#components)
- [User Authentication](#user-authentication)
- [Reservation Logic](#reservation-logic)
- [Mobile Navigation](#mobile-navigation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

This project is a library book reservation system built using React and Next.js. Users can browse a catalog of books, view detailed information in a modal, and reserve available books for 3 days. A user must be logged in to reserve books. The project includes a mobile-responsive navigation bar with a user avatar and dropdown for account actions.

---

## Features

- Book browsing with search and category filters.
- Pagination support for large book lists.
- Book details modal with tabs (details & description).
- Reservation system that stores reservations locally with expiry (3 days).
- User login modal and session management.
- Mobile-friendly slide-in sidebar navigation.
- User avatar with dropdown menu for reservation and logout.
- Animated components using AOS library.
- Responsive design for desktop and mobile.
- Accessibility considerations (aria labels, keyboard navigation).

---

## Technologies Used

- **React** - UI library.
- **Next.js** - React framework for SSR and routing.
- **Tailwind CSS** - Utility-first CSS framework.
- **React Icons** - Icon library.
- **AOS (Animate On Scroll)** - Animation library.
- **Headless UI** - Accessible UI components (Dialog).
- **TypeScript** - Type safety and improved DX.
- **LocalStorage** - Client-side reservation persistence.

---

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm or yarn package manager

---

## Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/library-reservation.git
cd library-reservation
```

2. Install dependencies:
```
npm install
# or
yarn install
```
3. Configure environment variables if needed (e.g. for authentication APIs).

## Running the Project
Start the development server:
```
npm run dev
# or
yarn dev
```
Open http://localhost:3000 to view the app in the browser.

## Folder Structure
```
/components      # React components (BookCard, BookDetailsModal, MobileNaveBar, LoginModal, etc)
/pages           # Next.js pages and routing
/public          # Static assets (images, icons)
/styles          # Tailwind CSS and global styles
/utils           # Utility functions (reservation helpers, book availability)
/data            # Static data (books, nav links)
/hooks           # Custom React hooks
/constants       # Constants like navLinks, contact data
```

## Components

- **BookCard** : Displays book info in grid.

- **BookDetailsModal** : Modal with detailed book info and reserve button.

- **MobileNaveBar** : Slide-in mobile sidebar with nav links and user avatar.

- **LoginModal** : Handles user authentication flow.

- **Reservation System** : LocalStorage based reservation with expiration.


## User Authentication
- User data is stored in localStorage.

- LoginModal component handles login/signup.

- User avatar and menu visible only when logged in.

- Logout clears user session from localStorage.

## Reservation Logic
- Books can be reserved only if available and user is logged in.

- Reservations saved in localStorage with timestamp.

- Reservations expire after 3 days and are automatically cleared.

- User cannot reserve the same book twice.

- Reserved books show in a dedicated Reserved Books page.

## Mobile Navigation
- Slide-in sidebar activated by hamburger menu.

- Navigation links from config file.

- Close button and backdrop to dismiss.

- User avatar at bottom if logged in.

- Avatar click toggles dropdown menu with Reservation & Logout options.

## Contributing
Contributions are welcome!
Please follow these steps:

Fork the repository.

Create a new branch: git checkout -b feature/your-feature

Commit your changes: git commit -m 'Add your feature'

Push to branch: git push origin feature/your-feature

Open a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

# Contact
- Baljeet Gunghas
- Email: baljeetgunghas5@gmail.com
- LinkedIn: https://linkedin.com/in/dev-baljeet-gunghas-b6698421b/
- GitHub: https://github.com/BaljeetGunghas

## Thank you for checking out this project! Feel free to reach out with questions or feedback.


Let me know if you want me to customize or add any other sections!