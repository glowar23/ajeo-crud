import pool from "@/lib/db";
import { NextResponse } from "next/server";

// GET por ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { nombre, email } = await request.json();

    const result = await pool.query(
      "UPDATE usuarios SET nombre=$1, email=$2 WHERE id=$3 RETURNING *",
      [nombre, email, id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await pool.query("DELETE FROM usuarios WHERE id=$1", [id]);

    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}
