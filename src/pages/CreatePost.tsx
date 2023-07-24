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
      maxHeight: "400px",
    } as EasyMDE.Options;
  }, []);

  return (
    <div className="">
      <button
        onClick={() => {
          if (inputRef.current) inputRef.current.click();
        }}
      >
        Loading image
      </button>
      <input
        ref={inputRef}
        type="file"
        onChange={(e) => handleChangeFile(e)}
        hidden
      />
      {imageUrl && (
        <>
          <button onClick={onClickRemoveImage}>Delete</button>
          <img
            src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <input
        type="text"
        value={textTitle}
        onChange={(e) => setTextTitle(e.target.value)}
        placeholder="Article title"
      ></input>
      <input
        type="text"
        onChange={(e) => setTags(e.target.value)}
        value={tags}
        placeholder="Tags"
      ></input>

      <SimpleMDE value={textArticle} onChange={onChange} options={options} />
      <div>
        <button onClick={() => handleSubmit()}>Опубликовать</button>
        <Link to={"/posts"}>
          <button>Отмена</button>
        </Link>
      </div>
    </div>
  );
}
