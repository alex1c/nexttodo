import connectMongoDB from "@/libs/mongodb";
import TaskModel from "@/models/taskmodel";
import { NextResponse } from "next/server";

/* export async function GET() {
  await connectMongoDB();
  const tasks = await TaskModel.find();
  return NextResponse.json({ tasks });
} */

export async function POST(request) {
  console.log("request-------", request);
  //записываем в бд одну задачу

  const { name, body, author, category } = await request.json();
  //console.log("body-------", category);

  if (body || name) {
    //console.log("we are here ");
    await connectMongoDB();
    await TaskModel.create({ name, body, author, category });
    return NextResponse.json({ message: "Task Created" }, { status: 201 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await TaskModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" }, { status: 200 });
}

export async function GET(request, { params }) {
    //const { cat } = params;
   
    const cat = request.nextUrl.searchParams.get("cat");
    console.log('params---------------',params)
  await connectMongoDB();
  //const tasks = await TaskModel.find();
  const tasks = await TaskModel.find({ category: cat });
  return NextResponse.json({body: tasks }, { status: 200 });
}
