import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // Fetch users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFiltered(data);
      });
  }, []);

  // Filter users
  useEffect(() => {
    const result = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, users]);

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container">
      <h1 className="header">Brokod - User Explorer</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="grid">
        {filtered.map((user) => (
          <div key={user.id} className="card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Company: {user.company?.name}</p>

            <button onClick={() => toggleDetails(user.id)} className="btn">
              {expandedId === user.id ? "Hide" : "More Info"}
            </button>

            {expandedId === user.id && (
              <div className="details">
                <p><b>Phone:</b> {user.phone}</p>
                <p><b>Website:</b> {user.website}</p>
                <p><b>Address:</b> {user.address.street}, {user.address.city}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
