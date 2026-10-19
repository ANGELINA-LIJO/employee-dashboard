
import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark app-navbar">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          Employee Portal
        </NavLink>
        <div className="navbar-nav ms-auto flex-row gap-3">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/employee-form">
            Employee Form
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("API error");
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch(() => setError("Unable to load employees. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container page-content">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h2 className="fw-bold">Employee Dashboard</h2>
          <p className="text-secondary">Employee information from the API</p>
        </div>
        <span className="badge text-bg-primary fs-6">
          Total Employees: {employees.length}
        </span>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading && <p className="text-center">Loading employees...</p>}
          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td className="fw-semibold">{employee.name}</td>
                      <td>{employee.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    location: "",
    salary: ""
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      `Form completed for ${form.name}. No data was sent to a server.`
    );
  }

  return (
    <div className="container page-content">
      <div className="card form-card shadow-sm border-0 mx-auto">
        <div className="card-body p-4 p-md-5">
          <h2 className="fw-bold mb-2">Employee Form</h2>
          <p className="text-secondary mb-4">Enter employee details below.</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter employee name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input
                className="form-control"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                className="form-control"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Salary</label>
              <input
                className="form-control"
                type="number"
                min="0"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Submit
            </button>
          </form>

          {message && (
            <div className="alert alert-success mt-3 mb-0">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
