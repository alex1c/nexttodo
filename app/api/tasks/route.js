//import connectMongoDB from "@/libs/mongodb";
import connectMongoDB from '../../../lib/mongodb';

//import TaskModel from "@/models/taskmodel";
import TaskModel from '../../../models/taskmodel';
import { NextResponse } from 'next/server';

/* export async function GET() {
  await connectMongoDB();
  const tasks = await TaskModel.find();
  return NextResponse.json({ tasks });
} */

export async function POST(request) {
   console.log("request-------", request);
  //записываем в бд одну задачу

  const { name, body, author, category, authorName, authorEmail } =
    await request.json();
  //console.log("body-------", name, body, author, category , authorName, authorEmail);

  if (body || name) {
    //console.log("we are here ");
    await connectMongoDB();
    await TaskModel.create({
      name,
      body,
      author,
      category,
      authorName,
      authorEmail,
    });
    return NextResponse.json({ message: 'Task Created' }, { status: 201 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await TaskModel.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Task deleted' }, { status: 200 });
}

//сюда приходит запрос на вывод задач на главную страницу
//в параметры добавил ип для всех и name для зарегистрированных пользователей
export async function GET(request, { params }) {
  //const { cat } = params;

  const cat = request.nextUrl.searchParams.get('cat');
  const author = request.nextUrl.searchParams.get('author');
  const authorName = request.nextUrl.searchParams.get('authorName');

  console.log(
    'params from route---------------',
    params,
    author,
    authorName,
    ' request---',
    request
  );
  await connectMongoDB();
  //const tasks = await TaskModel.find();
  //const tasks = await TaskModel.find({ category: cat, author: author });
  //const tasks = await TaskModel.find({ category: cat });

  let tasks = ''

  if (cat && authorName && author) {
    //console.log('11')
     tasks = await TaskModel.find({
      $and: [{ category: cat, authorName: authorName,  author: author }],
    });
  } else if (cat && authorName ) {
    //console.log('22')
     tasks = await TaskModel.find({
      $and: [{ category: cat , authorName: authorName}],
    });
  } else if (cat && author) {
    //console.log('33')
     tasks = await TaskModel.find({
      $and: [{ category: cat, author: author }],
    });
    //убрать на проде иначе могут все кому то вывлиться
 /*  } else if (cat) {
    const tasks = await TaskModel.find({
      $or: [{ category: cat }],
    });*/
  } 

  return NextResponse.json({ body: tasks }, { status: 200 });
}