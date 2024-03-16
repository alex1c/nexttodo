import connectMongoDB from "@/libs/mongodb";
import TaskModel from "@/models/taskmodel";
import { NextResponse } from "next/server";
 
export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newBody: body, newAuthor: author, newCategory: category } = await request.json();
    await connectMongoDB();
    await TaskModel.findByIdAndUpdate(id, { name, body, author, category});
    return NextResponse.json({ message: "Task updated" }, { status: 200 });
}
 
export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const task = await TaskModel.findOne({ _id: id });
    return NextResponse.json({ task }, { status: 200 });
}