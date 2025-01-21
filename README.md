# Xcontour: Smart Contract Management System

Xcontour is an AI-powered online **smart contract management system** designed to simplify and enhance the way businesses create, edit, and manage smart contracts. With a modern, user-friendly interface and advanced tools for contract editing, progress tracking, AI insights, and analytics, Xcontour offers an all-in-one solution for efficient contract management.

## Features
- **User-Friendly Contract Editor**: Create and edit contracts effortlessly with a clean and intuitive interface.
- **Progress Tracker**: Monitor contract milestones and stay on top of key deadlines.
- **AI Integrations**: Analyze risks, optimize terms, and gain intelligent suggestions for contract improvements.
- **Overview Dashboard**: Visualize insights and metrics for better decision-making.
- **Modern UI/UX**: Built with ShadCN UI and Framer Motion for a sleek and interactive experience.

---

## Tech Stack
This project leverages cutting-edge technologies to deliver a fast, responsive, and scalable application:

### Frameworks and Libraries
- **Vite**: For fast and optimized development.
- **ShadCN UI**: For a modern, accessible, and customizable user interface.
- **Framer Motion**: For smooth animations and transitions.
- **React Redux**: For efficient global state management.
- **React Query**: For data fetching and caching.
- **TypeScript**: For type-safe and robust development.
- **Tailwind CSS**: For utility-first, responsive styling.
- **Zod**: For schema validation and form handling.

### API Integration
- **Gemini API**: To enable seamless interaction with blockchain and smart contract systems.

---

## Getting Started
Follow these steps to set up and run the project locally:

### Prerequisites
- Node.js (v16 or later)
- npm or Yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/xcontour.git
   cd xcontour
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Gemini API credentials:
   ```env
   VITE_GEMINI_API_KEY=your_api_key
   VITE_GEMINI_API_SECRET=your_api_secret
   ```

### Running the Application
Start the development server:
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready application.
- `npm run preview`: Previews the built application.
- `npm run lint`: Lints the codebase using ESLint.

---

## Folder Structure
```plaintext
src/
├── components/       # Reusable UI components
├── features/         # Redux slices and feature logic
├── hooks/            # Custom React hooks
├── pages/            # Application pages
├── services/         # API calls and integrations
├── styles/           # Tailwind CSS configuration and global styles
├── utils/            # Utility functions
```

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add your message here'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- **Vite** for blazing-fast build tools.
- **ShadCN UI** for the elegant design system.
- **Gemini API** for blockchain and smart contract integration.
- **Framer Motion**, **React Query**, and **Zod** for their amazing tools to enhance application functionality and reliability.

---

## Contact
For any inquiries or support, feel free to reach out to [aemmanuel685210@gmail.com](mailto:aemmanuel685210@gmail.com).
