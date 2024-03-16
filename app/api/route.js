import { ConnectDB } from "@/lib/config/db.js";
import TodoModel from "@/lib/models/TodoModel.js";
import { NextResponse } from "next/server.js";

const loadDB = async () => {
    await ConnectDB();
}

loadDB();

export async function GET(request) {
    const allTodoData = await TodoModel.find({});
    return NextResponse.json({ data: allTodoData });
}

export async function POST(request) {

    const {title, description} = await request.json();
    await TodoModel.create({
        title,
        description
    })

    return NextResponse.json({ message: "TODO CREATED" })
}

export async function DELETE(request) {
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndDelete(mongoId);
    return NextResponse.json({ message: "TODO Deleted" })
}

export async function PUT(request) {
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndUpdate(mongoId,{
        $set: {
            isCompleted: true,
        }
    });
    return NextResponse.json({ message: "TODO Completed" })
}