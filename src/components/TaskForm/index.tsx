import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";
import { useTask } from "@/store/useTaskStore";
import { toast } from "sonner";
import { REQUIRED_FIELD } from "../ui/ToDoApp/constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export const TaskForm = ({ open, onClose, taskData }: any) => {
  const { createTask, updateTask } = useTask();

  const isEdit = !!taskData;

  const createTaskForm = useFormik({
    initialValues: {
      title: taskData?.title || "",
      description: taskData?.description || "",
      deadline: taskData?.deadline || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(REQUIRED_FIELD),
      // description: Yup.string().required(REQUIRED_FIELD),
      deadline: Yup.string().required(REQUIRED_FIELD),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEdit) {
          await updateTask(taskData.id, {
            ...values,
            isCompleted: taskData?.isCompleted ? true : false,
          });
        } else {
          await createTask({
            ...values,
            isCompleted: false,
          });
          toast.success("Task created successfully");
        }
        resetForm();
        onClose();
      } catch (error: string) {
        toast.error(error);
      }
    },
  });

  const { values, handleBlur, touched, errors, handleChange } = createTaskForm;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Task</DialogTitle>
          </DialogHeader>
          <FormikProvider value={createTaskForm}>
            <Form className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title" className="pb-2">
                  Task title
                </Label>
                <Input
                  name="title"
                  placeholder="Enter Task title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.title && errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description" className="pb-2">
                  Task Description
                </Label>
                <Textarea
                  name="description"
                  placeholder="Task description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="description" className="pb-2">
                  Task Deadline
                </Label>
                <Input
                  type="datetime-local"
                  name="deadline"
                  value={values.deadline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.deadline && errors.deadline && (
                  <p className="text-sm text-red-500 mt-1">{errors.deadline}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  {isEdit ? "Edit Task" : "Create Task"}
                </Button>
              </div>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskForm;
