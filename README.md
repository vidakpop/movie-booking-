
# Movie Booking System

Welcome to the Movie Booking System repository! This project is designed to provide a seamless and efficient way for users to book movie tickets online.

## Table of Contents

- [Movie Booking System](#movie-booking-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  - [Contact](#contact)

## Features

- **User Authentication**: Secure login and registration using JWT tokens.
- **Movie Listings**: Browse and search for movies.
- **Booking System**: Book tickets for selected movies with seat selection.
- **Payment Integration**: Secure payment gateway for ticket purchases using M-Pesa.
- **User Dashboard**: View booking history and manage profile.
- **Admin Panel**: Manage movies, screenings, and bookings.
- **Responsive Design**: Mobile-friendly interface for all devices.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Python](https://www.python.org/) (version 3.8 or later)
- [Django](https://www.djangoproject.com/) (version 3.2 or later)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/vidakpop/movie-booking-.git
    cd movie-booking-
    ```

2. **Install frontend dependencies**:
    ```bash
    npm install
    ```

3. **Install backend dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

### Running the Application

To start the development server, run the following commands:

1. **Start the Django backend server**:
    ```bash
    python manage.py runserver
    ```

2. **Start the React frontend server**:
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Usage

1. **Register/Login**: Users need to register or login to book tickets.
2. **Browse Movies**: Navigate through the movie listings and select a movie.
3. **Book Tickets**: Choose the number of tickets and proceed to book.
4. **Payment**: Complete the booking by making a payment using M-Pesa.
5. **Dashboard**: View your booking history and manage your profile.

## Project Structure

```plaintext
movie-booking-/
├── backend/                # Django backend files
│   ├── movie_booking/      # Main Django app
│   ├── manage.py           # Django management file
│   └── ...                 # Other backend files
├── frontend/               # React frontend files
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Entry point
│   └── styles/             # CSS styles
├── .gitignore              # Git ignore file
├── README.md               # Project README file
├── package.json            # Project configuration and dependencies
├── requirements.txt        # Backend dependencies
└── ...                     # Other configuration files
```

## Technologies Used

- **Frontend**: 
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - **HTML**: Markup language for creating web pages.
  - **CSS**: Styling language for designing web pages.
- **Backend**: 
  - [Django](https://www.djangoproject.com/): High-level Python web framework.
- **Database**: 
  - [SQLite](https://www.sqlite.org/): Default database for Django (can be replaced with PostgreSQL, MySQL, etc.).
- **Authentication**: 
  - **JWT (JSON Web Token)**: For secure user authentication.
- **Payment Gateway**: 
  - [M-Pesa](https://www.safaricom.co.ke/personal/m-pesa): For secure payment processing.
- **Version Control**: 
  - **Git**: For version control and collaboration.

## Contributing

We welcome contributions! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

Please make sure your code follows our [coding guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

We would like to thank the following resources and libraries that made this project possible:

- [React](https://reactjs.org/)
- [Django](https://www.djangoproject.com/)
- [M-Pesa](https://www.safaricom.co.ke/personal/m-pesa)
- [Bootstrap](https://getbootstrap.com/)
- [SQLite](https://www.sqlite.org/)

## Contact

If you have any questions or suggestions, feel free to reach out to the project maintainers:

- vidakpop & derkim2

---

Thank you for using the Movie Booking System!
```

Feel free to customize and modify this README file further according to your project's specific needs and details. If you have any additional information or sections you would like to include, let me know!
