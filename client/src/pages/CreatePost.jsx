import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type="text" placeholder="Title" required id="title" className="flex-1"/>
            <Select>
                <option value="uncategorized">Select a category</option>
                <option value="general">General</option>
                <option value="software">Software</option>
                <option value="hardware">Hardware</option>
            </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-2 border-orange-400 p-3">
            <FileInput type='file' accept="image/*" required/>
            <Button type="button" className="bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300" size={'sm'} outline>Upload Photo</Button>

        </div>
        <ReactQuill theme="snow" placeholder="write something..." className="h-72 mb-12" required/>
        <Button type="submit" className="bg-gradient-to-r from-red-600 via-orange-400 to-yellow-300 hover:bg-gradient-to-l">Publish</Button>
      </form>
    </div>
  );
}
