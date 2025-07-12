import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../dialog";
import { useFormik, FormikProvider, Form, Field } from "formik";
import { Input } from "../../input";
import { Label } from "../../label";
import { Textarea } from "../../textarea";
import { Button } from "../../button";

import * as Yup from "yup";
import { REQUIRED_FIELD } from "../constants";
import { useTask } from "@/store/useTaskStore";
import { toast } from "sonner";

export const TaskForm = ({ open, onClose }: any) => {
  const { createTask } = useTask();

  const createTaskForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(REQUIRED_FIELD),
      // description: Yup.string().required(REQUIRED_FIELD),
      deadline: Yup.string().required(REQUIRED_FIELD),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        await createTask({
          ...values,
          isCompleted: false,
        });
        toast.success("Task created successfully");
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
                <Button type="submit">Create Task</Button>
              </div>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskForm;
