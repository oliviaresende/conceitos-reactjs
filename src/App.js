import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get('/repositories').then(res => {
        setRepositories(res.data)
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Umbriel ${count}`,
      techs: ["Node", "Express", "TypeScript"]
    });

    setRepositories([...repositories, res.data]);
    setCount(count + 1);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
