import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePostBook } from "@/features/book/usePostBook";
import { useState } from "react";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  published: Yup.string().required("Publication date is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  format: Yup.string().required("Format is required"),
  isbn: Yup.number().required("ISBN is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Cover image is required"),
});

const fields = [
  { name: "title", label: "Book Title" },
  { name: "published", label: "Published Date" },
  { name: "author", label: "Author" },
  { name: "genre", label: "Genre" },
  { name: "format", label: "Format" },
  { name: "isbn", label: "ISBN" },
  { name: "description", label: "Description" },
];

export function Addbook() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const mutation = usePostBook();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file && file instanceof Blob) {
      try {
        const objectUrl = URL.createObjectURL(file);
        setFieldValue("image", file);
        setImagePreview(objectUrl);
      } catch (error) {
        console.error("Error creating object URL:", error);
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const {
      title,
      published,
      author,
      genre,
      format,
      isbn,
      description,
      image,
    } = values;
    mutation.mutate(
      { title, published, author, genre, format, isbn, description, image },
      {
        onError: (error) => {
          setSubmitFailed(error.message);
          setSubmitSuccess(false);
          setSubmitting(false);
        },
        onSuccess: () => {
          setSubmitSuccess(true);
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-none sm:px-6 md:p-10 border-1">
      <CardHeader className="space-y-4">
        <CardTitle className="text-3xl font-bold">Add New Book</CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <Formik
          initialValues={{
            title: "",
            published: "",
            author: "",
            genre: "",
            format: "",
            isbn: "",
            description: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.name == "description" ? (
                    <Field
                      as={Textarea}
                      id={field.name}
                      name={field.name}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <Field
                      id={field.name}
                      name={field.name}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="input-custom"
                    />
                  )}
                  {errors[field.name] && touched[field.name] && (
                    <div className="text-red-500">{errors[field.name]}</div>
                  )}
                </div>
              ))}

              <div className="space-y-2">
                <Label htmlFor="image">Book Cover Image</Label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                  className="input-custom"
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-32 h-32"
                  />
                )}
                {errors.image && touched.image && (
                  <div className="text-red-500">{errors.image}</div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Add Book
              </Button>
              {submitSuccess && (
                <div className="fixed z-50 w-full max-w-md p-4 transition-all duration-300 ease-in-out -translate-x-1/2 rounded-md shadow-lg top-4 left-1/2 bg-card">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="text-lg font-medium">Success</h4>
                      <p className="text-sm text-muted-foreground">
                        Your action was successful!
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

{
  /* 
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
  <div className="w-full max-w-3xl p-6 mx-auto sm:px-6 md:p-10">
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">Add New Book</h1>
    <form className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="title">Book Title</Label>
        <Input id="title" placeholder="Enter book title" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="author">Author</Label>
        <Input id="author" placeholder="Enter author name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="publication-date">Publication Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              <span>Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="genre">Genre</Label>
        <Select id="genre">
          <SelectTrigger>
            <SelectValue placeholder="Select genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fiction">Fiction</SelectItem>
            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
            <SelectItem value="mystery">Mystery</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="sci-fi">Science Fiction</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Enter book description" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cover-image">Cover Image</Label>
        <Input id="cover-image" type="file" />
      </div>
    </form>
    <Button className="w-full">Submit</Button>
  </div>
</div>; */
}
