import pool from "@/lib/db";
import { NextResponse } from "next/server";

// GET - Obtener todos
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios ORDER BY id"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}

// POST - Crear usuario
export async function POST(request) {
  try {
    const { nombre, email } = await request.json();

    const result = await pool.query(
      "INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *",
      [nombre, email]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
