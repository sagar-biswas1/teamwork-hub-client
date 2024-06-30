// components/CodeEditor.js
import React, { useCallback, useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools"; // Optional: enable auto-completion
import "ace-builds/src-noconflict/ext-searchbox"; // Optional: enable search box
import io from "socket.io-client";
import { debounce } from "lodash";
import { useParams } from "react-router-dom";
const CodeEditor = ({ userId }) => {
  const { id: projectId } = useParams();
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("loading codes...");
  const [cursors, setCursors] = useState({});
  const [isReadOnlyEditor, setIsReadOnlyEditor] = useState(false);
  // my socket code
//   const debouncedEmit = useCallback(
//     debounce((projectId, code) => {
//       if (!socket) return;
//       socket.emit("codeEdited", { projectId, code });
//     }, 500), // Adjust the debounce delay (in milliseconds) as needed
//     [socket]
//   );

//   useEffect(() => {
//     const skt = io("http://localhost:3000");
//     setSocket(skt);
//     return () => {
//       skt.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (!socket) return;
//     debouncedEmit(projectId, code);

//     // Cleanup function to cancel any pending debounced calls if component unmounts or dependencies change
//     return () => {
//       debouncedEmit.cancel();
//     };
//   }, [socket, code, projectId, debouncedEmit]);
//   useEffect(() => {
//     if (!socket) return;
//     socket.on("codeUpdated", ({ projectId, code }) => {
//       setCode(code);
//     });
//   }, [socket, projectId]);

//   useEffect(() => {
//     if (!socket || !projectId) return;

//     socket.once("loadDocument", (doc) => {
//       setCode(doc);
//       setIsReadOnlyEditor(false);
//     });
//     socket.emit("getDocumentId", projectId);
//   }, [socket, projectId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  // end of my socket code

  //   useEffect(() => {
  //     // socket.emit('joinProject', { projectId, userId });

  //     // socket.on('codeUpdated', (updatedCode) => {
  //     //   setCode(updatedCode);
  //     // });

  //     // socket.on('cursorUpdated', (cursorData) => {
  //     //   setCursors((prevCursors) => ({
  //     //     ...prevCursors,
  //     //     [cursorData.userId]: cursorData.cursorPosition,
  //     //   }));
  //     // });

  //     // return () => {
  //     //   socket.emit('leaveProject', { projectId, userId });
  //     //   socket.off('codeUpdated');
  //     //   socket.off('cursorUpdated');
  //     // };
  //   }, [projectId, userId]);

  //   const handleCodeChange = (newCode) => {
  //     setCode(newCode);

  //     console.log(newCode);
  //     // socket.emit('editCode', { projectId, code: newCode });
  //   };

  const handleCursorPositionChange = (selection) => {
    const cursorPosition = {
      row: selection.getCursor().row,
      column: selection.getCursor().column,
    };
    console.log(cursorPosition);
    // socket.emit('updateCursor', { projectId, userId, cursorPosition });
  };

  return (
    <div className="flex justify-center">
      <AceEditor
        mode="javascript"
        theme="solarized_light"
        value={code}
        onChange={handleCodeChange}
        onCursorChange={handleCursorPositionChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        readOnly={isReadOnlyEditor}
        width="90%"
        height="500px"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          //   enableSnippets: true,
          showLineNumbers: true,
          tabSize: 1,
        }}
        style={{ position: "relative" }}
      />
      {/* Render cursors for other users */}
      {/* {Object.keys(cursors).map((cursorUserId) => {
        if (cursorUserId !== userId) {
          const cursorPos = cursors[cursorUserId];
          const cursorStyle = {
            position: 'absolute',
            left: `${cursorPos.column * 8}px`, // Adjust based on font size and editor settings
            top: `${cursorPos.row * 16}px`, // Adjust based on font size and editor settings
            width: '2px',
            height: '14px',
            backgroundColor: '#FF0000', // Adjust color as needed
          };
          return <div key={cursorUserId} style={cursorStyle}></div>;
        }
        return null;
      })} */}
    </div>
  );
};

export default CodeEditor;
