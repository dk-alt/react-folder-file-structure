import React, { useEffect, useState } from "react";
import { FileFolder, HoverButton } from "./FileFolder";
import "./styles.css";

export default function App() {
  const initialDataList = [
    {
      parent: 0,
      name: "src",
      id: 1,
      isFolder: true,
    },
    {
      parent: 1,
      name: "test-123.js",
      isFolder: false,
      id: Math.random(),
    },
    {
      parent: 1,
      name: "index.js",
      isFolder: false,
      id: Math.random(),
    },
  ];
  // const initialData = [
  //   {
  //     name: "src",
  //     isFolder: true,
  //     data: [
  //       { name: "app.js", isFolder: false },
  //       { name: "index.js", isFolder: false }
  //     ]
  //   },
  //   {
  //     name: "public",
  //     isFolder: true,
  //     data: [
  //       { name: "config.js", isFolder: false },
  //       {
  //         name: "Test",
  //         isFolder: true,
  //         data: [
  //           { name: "web-config.js", isFolder: false },
  //           { name: "web-test.js", isFolder: false },
  //           {
  //             name: "New folder",
  //             isFolder: true,
  //             data: [{ name: "new-test.js", isFolder: false }]
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: "node_module",
  //     isFolder: true,
  //     data: [{ name: "node-file", isFolder: false }]
  //   }
  // ];

  const [dataList, setDataList] = useState(initialDataList);

  const [folderData, setfolderData] = useState([]);

  const createFileOrFolder = (newItem) => {
    setDataList((preData) => [...preData, newItem]);
  };
  const deleteFileOrFolder = (id) => {
    console.log("fff", dataList);

    console.log("fff", id);
    setDataList((preData) => {
      const filterData = preData.filter((item) => item.id !== id);
      console.log("tttff", filterData);
      return filterData;
    });
  };
  const getData = React.useCallback(
    (newDataList, parent, data = []) => {
      newDataList.forEach((item) => {
        if (item.parent === parent) {
          data.push({
            name: item.name,
            id: item.id,
            isFolder: item.isFolder,
            data: getData(dataList, item.id, []),
          });
        }
      });
      return data;
    },
    [dataList],
  );
  useEffect(() => {
    const finalData = [];

    dataList.forEach((item) => {
      if (!item.parent) {
        finalData.push({
          name: item.name,
          id: item.id,
          isFolder: item.isFolder,
          data: getData(dataList, item.id, []),
        });
      }
    });

    console.log("ttt", finalData);
    setfolderData(finalData);
  }, [dataList, getData]);
  return (
    <div className="App">
      <h1> File Folder</h1>
      <HoverButton createItem={createFileOrFolder} />
      {folderData.map((item) => (
        <FileFolder
          prop={item}
          key={item.id}
          createItem={createFileOrFolder}
          deleteFileOrFolder={deleteFileOrFolder}
        />
      ))}
    </div>
  );
}
