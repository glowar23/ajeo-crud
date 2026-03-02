"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "/api/usuarios";

  const cargarUsuarios = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const guardarUsuario = async (e) => {
    e.preventDefault();

    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
      });
    }

    setNombre("");
    setEmail("");
    setEditId(null);
    cargarUsuarios();
  };

  const eliminar = async (id : number) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    cargarUsuarios();
  };

  const editar = (user) => {
    setEditId(user.id);
    setNombre(user.nombre);
    setEmail(user.email);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>CRUD Usuarios - Next.js</h1>

      <form onSubmit={guardarUsuario}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">
          {editId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <hr />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => editar(user)}>
                  Editar
                </button>
                <button onClick={() => eliminar(user.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
