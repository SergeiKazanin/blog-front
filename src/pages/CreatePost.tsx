import React, { useCallback, useMemo, useRef, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";
import { useCreatePostMutation, useUploadFileMutation } from "../store/postApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [textArticle, setTextArticle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [tags, setTags] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileLoad] = useUploadFileMutation();
  const [loadPost] = useCreatePostMutation();
  const navigate = useNavigate();

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files) {
        formData.append("image", e.target.files[0]);
        const fileLink = await fileLoad(formData).unwrap();
        setImageUrl(fileLink.url);
      }
    } catch (error) {
      console.log(error);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = useCallback((value: string) => {
    setTextArticle(value);
  }, []);

  const handleSubmit = async () => {
    try {
      const post = {
        title: textTitle,
        tags: tags.split(","),
        imageUrl,
        text: textArticle,
      };
      const postload = await loadPost(post).unwrap();
      const id = postload._id;
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
      alert("Ошибка при создании сатьи");
    }
  };

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      placeholder: "Введите текст...",
      status: false,
      maxHeight: "250px",
    } as EasyMDE.Options;
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full p-6">
      <div className="flex flex-col gap-3 items-start">
        <button
          className="bg-teal-200 w-[200px] h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-md"
          onClick={() => {
            if (inputRef.current) inputRef.current.click();
          }}
        >
          Load image
        </button>
        <input
          ref={inputRef}
          type="file"
          onChange={(e) => handleChangeFile(e)}
          hidden
          className=""
        />
        {imageUrl && (
          <>
            <div
              style={{
                backgroundImage: `url(${process.env.REACT_APP_API_URL}${imageUrl})`,
              }}
              className="w-full h-[400px] bg-center  bg-no-repeat bg-cover rounded-md"
            ></div>
            <button
              className="bg-red-200 w-[200px] h-10 rounded-md flex items-center justify-center hover:bg-red-400 text-2xl shadow-md"
              onClick={onClickRemoveImage}
            >
              Delete image
            </button>
          </>
        )}
      </div>

      <input
        type="text"
        value={textTitle}
        onChange={(e) => setTextTitle(e.target.value)}
        placeholder="Article title"
        className="h-12 p-3 text-2xl relative outline-none rounded-md shadow-md"
      ></input>
      <input
        type="text"
        onChange={(e) => setTags(e.target.value)}
        value={tags}
        placeholder="Tags"
        className="h-10 p-2 relative outline-none rounded-md shadow-md"
      ></input>

      <SimpleMDE
        className="rounded-md shadow-md"
        value={textArticle}
        onChange={onChange}
        options={options}
      />
      <div className="flex gap-6">
        <button
          className="bg-teal-200 w-[200px] h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-md"
          onClick={() => handleSubmit()}
        >
          Publish
        </button>
        <Link to={"/posts"}>
          <button className="bg-red-200 w-[200px] h-10 rounded-md flex items-center justify-center hover:bg-red-400 text-2xl shadow-md">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
}
