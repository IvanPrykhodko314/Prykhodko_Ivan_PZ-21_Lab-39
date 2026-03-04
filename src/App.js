import React, { useState, useEffect, useMemo, useCallback } from "react";

function App() {
  const [number, setNumber] = useState(1);
  const [count, setCount] = useState(0);

  const handleAction = useCallback(() => {
    console.log("Done!");
    alert("Done!");
  }, []);

  return (
    <div>
      <TextCounter />
      <UsersTable />

      <h2>Count sum</h2>
      <input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))}/>
      <SumCalculation number={number} />

      <h2>useCallback example</h2>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <button onClick={() => setCount(count - 1)}>Reduce count</button>

      <ChildComponent onAction={handleAction} />
    </div>
  );
}

function TextCounter() {
  const [text, setText] = useState("");

  return (
    <div>
      <h2>Enter some text:</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Symbol count: {text.length}</p>
    </div>
  );
}

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>loading...</p>;

  return (
    <div>
      <h2>Users list</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SumCalculation({ number }) {
  const computeSum = (n) => {
    console.log("Calculate sum...");
    return n <= 1 ? 1 : n + computeSum(n - 1);
  };

  const sum = useMemo(() => computeSum(number), [number]);

  return <p>Сума від 1 до {number} дорівнює {sum}</p>;
}

const ChildComponent = React.memo(({ onAction }) => {
  console.log("Render ChildComponent");
  return (
    <div>
      <button onClick={onAction}>Do smth</button>
    </div>
  );
});

export default App;