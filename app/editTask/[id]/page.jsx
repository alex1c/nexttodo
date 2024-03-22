//import EditProductForm from "@/components/EditProductForm";
import EditTaskForm from "@/app/components/EditTaskForm/EditTaskForm";
 
const getTaskById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            cache: "no-store",
        });
 
        if (!res.ok) {
            throw new Error("Failed to fetch task");
        }
 
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
 
export default async function EditTask({ params }) {
    const { id } = params;
    const { task } = await getTaskById(id);
    const { name, body, author,category } = task;
 
    return <EditTaskForm id={id} name={name} body={body} author={author} category={category} />;
}