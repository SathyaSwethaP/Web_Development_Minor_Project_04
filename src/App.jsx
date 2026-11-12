import { useState } from "react";
import TodoApp from "./components/TodoApp";
import NotesApp from "./components/NotesApp";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="app-container">

      <nav className="navbar">
        <h2>TaskFlow ✨</h2>

        <div className="nav-links">
          <button onClick={() => setActivePage("home")}>
            Home
          </button>

          <button onClick={() => setActivePage("todo")}>
            To-Do
          </button>

          <button onClick={() => setActivePage("notes")}>
            Notes
          </button>
        </div>
      </nav>

      {activePage === "home" && (
        <section className="home-section">

          <div className="hero-content">
            <h1>Organize Your Day, <span>Beautifully.</span></h1>

            <p>
              Manage your daily tasks and keep your important
              thoughts in one simple place.
            </p>
          </div>

          <div className="app-cards">

            <div className="feature-card">
              <div className="card-icon">✅</div>
              <h2>To-Do App</h2>

              <p>
                Plan your day, manage tasks and track your progress.
              </p>

              <button onClick={() => setActivePage("todo")}>
                Open To-Do App →
              </button>
            </div>

            <div className="feature-card">
              <div className="card-icon">📝</div>
              <h2>Notes App</h2>

              <p>
                Write down your ideas, save notes and stay organized.
              </p>

              <button onClick={() => setActivePage("notes")}>
                Open Notes App →
              </button>
            </div>

          </div>
        </section>
      )}

      {activePage === "todo" && <TodoApp />}

      {activePage === "notes" && <NotesApp />}

      <footer>
        <p>© 2026 TaskFlow | Built with React.js ❤️</p>
      </footer>

    </div>
  );
}

export default App;