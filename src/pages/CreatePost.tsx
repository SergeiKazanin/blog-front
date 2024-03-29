import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";
import {
  useCreatePostMutation,
  useLazyGetPostQuery,
  useUpdatePostMutation,
  useUploadFileMutation,
} from "../store/postApi";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [textArticle, setTextArticle] = useState("");
  const [imageId, setImageId] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [tags, setTags] = useState("");
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileLoad] = useUploadFileMutation();
  const [loadPost] = useCreatePostMutation();
  const [getPost] = useLazyGetPostQuery();
  const [updatePost] = useUpdatePostMutation();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files) {
        formData.append("image", e.target.files[0]);
        const fileLink = await fileLoad(formData).unwrap();
        setImageId(fileLink.id);
      }
    } catch (error) {
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setImageId("");
  };

  const onChange = useCallback((value: string) => {
    setTextArticle(value);
  }, []);

  const handleSubmit = async () => {
    try {
      const post = {
        title: textTitle,
        tags: tags.split(","),
        imageId,
        text: textArticle,
      };

      const postload = edit
        ? await updatePost({ id, post }).unwrap()
        : await loadPost(post).unwrap();
      const idL = edit ? id : postload._id;
      navigate(`/post/${idL}`);
    } catch (error) {
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

  useEffect(() => {
    const Post = async (id: string) => {
      try {
        const post = await getPost(id).unwrap();
        setTextTitle(post.title);
        setImageId(post.imageId);
        setTags(post.tags.join());
        setTextArticle(post.text);
        setEdit(true);
      } catch {
        alert("Ошибка при загрузке");
      }
    };
    if (id) {
      Post(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="flex flex-col gap-3 w-full p-6">
      <div className="flex flex-col gap-3 items-start">
        <button
          className="bg-teal-200 px-4 h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-md"
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
        {imageId && (
          <>
            <div
              style={{
                backgroundImage: `url(${process.env.REACT_APP_API_URL}/uploads/${imageId})`,
              }}
              className="w-full h-[400px] bg-center  bg-no-repeat bg-cover rounded-md"
            ></div>
            <button
              className="bg-red-200 px-4 h-10 rounded-md flex items-center justify-center hover:bg-red-400 text-2xl shadow-md"
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
          className="bg-teal-200 px-4 h-10 rounded-md flex items-center justify-center hover:bg-teal-400 text-2xl shadow-md"
          onClick={() => handleSubmit()}
        >
          {edit ? "Save" : "Publish"}
        </button>
        <Link to={"/"}>
          <button className="bg-red-200 px-4 h-10 rounded-md flex items-center justify-center hover:bg-red-400 text-2xl shadow-md">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
}
