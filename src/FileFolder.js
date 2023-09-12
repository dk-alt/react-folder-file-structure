import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export const HoverButton = ({ createItem, parent, deleteFileOrFolder }) => {
  const [input, setInput] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef && inputRef.current && inputRef.current.focus();
  }, [input]);

  return (
    <div>
      <button onClick={() => setInput("folder")}>+Folder</button>
      {input && (
        <>
          <input ref={inputRef} />
          <button
            onClick={() => {
              createItem({
                name: inputRef.current.value,
                id: Math.random(),
                parent,
                data: [],
                isFolder: input === "folder"
              });
              inputRef.current.value = "";
              setInput("");
            }}
            type="submit"
          >
            ok
          </button>
        </>
      )}
      <button
        onClick={() => {
          setInput("file");
        }}
      >
        +File
      </button>
      {deleteFileOrFolder && (
        <button onClick={() => deleteFileOrFolder(parent)}>Delete</button>
      )}
    </div>
  );
};

export const FileFolder = ({
  prop: { name, isFolder, data, id },
  createItem,
  deleteFileOrFolder
}) => {
  const [hover, setHover] = useState(false);
  const [show, setShow] = useState(true);
  return (
    <>
      {isFolder && (
        <div
          className="folder"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span onClick={() => setShow(!show)}>{name}</span>
          {hover && (
            <HoverButton
              createItem={createItem}
              parent={id}
              deleteFileOrFolder={deleteFileOrFolder}
            />
          )}
        </div>
      )}
      {show && (
        <>
          {!isFolder && <div className="file">{name}</div>}
          {data &&
            data.map((item) => (
              <div className="level2">
                <FileFolder
                  prop={item}
                  key={item.id}
                  createItem={createItem}
                  deleteFileOrFolder={deleteFileOrFolder}
                />
              </div>
            ))}
        </>
      )}
    </>
  );
};
