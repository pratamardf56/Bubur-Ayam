import db from "@/lib/db";
import { NextResponse } from "next/server";

// Menampilkan semua data pesanan
export async function GET() {
    try {
        const [rows] = await db.query("SELECT * FROM pesan");

        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { success: false, message: "Gagal mengambil data" },
            { status: 500 }
        );
    }
}

// Menyimpan pesanan baru
export async function POST(request) {
    try {
        const body = await request.json();

        const { cart } = body;

        if (!cart || cart.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Keranjang kosong",
                },
                { status: 400 }
            );
        }

        for (const item of cart) {
            await db.query(
                `INSERT INTO pesan (nama, harga, jumlah)
         VALUES (?, ?, ?)`,
                [
                    item.name,
                    item.price,
                    item.quantity,
                ]
            );
        }

        return NextResponse.json({
            success: true,
            message: "Pesanan berhasil disimpan",
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan",
            },
            { status: 500 }
        );
    }
}