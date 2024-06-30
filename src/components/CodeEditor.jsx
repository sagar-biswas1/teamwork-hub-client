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
// import socket from "../socket";
import { useAuthContext } from "../context/AuthContext";
import useSocket from "../socket";

const CodeEditor = ({ projectId }) => {
  const { authUser } = useAuthContext();
  const socket = useSocket(authUser?._id);
  //   const [socket, setSocket] = useState(null);
  const [code, setCode] = useState("loading codes...");
  const [cursors, setCursors] = useState({});
  const [isReadOnlyEditor, setIsReadOnlyEditor] = useState(true);
  const [content, setContent] = useState({});
  // my socket code
  const debouncedEmit = useCallback(
    debounce(({ projectId, code, userId, creatorId }) => {
      if (!socket) return;
  
      const payLoad = { projectId, code };
      if (userId !== creatorId) {
        payLoad.collaborators = [userId];
      }
      
      socket.emit("documentEdited", payLoad);
    }, 1000), // Adjust the debounce delay (in milliseconds) as needed
    [socket]
  );

  //   useEffect(() => {
  //     const skt = io(import.meta.env.VITE_SOCKET_ENDPOINT);
  //     setSocket(skt);
  //     return () => {
  //       skt.disconnect();
  //     };
  //   }, []);
  
  useEffect(() => {
    if (!socket) return;

    debouncedEmit({
      projectId,
      code,
      userId: authUser?._id,
      creatorId: content?.createdBy?._id,
    });

    // Cleanup function to cancel any pending debounced calls if component unmounts or dependencies change
    return () => {
      debouncedEmit.cancel();
    };
  }, [socket, code, projectId, debouncedEmit]);
  useEffect(() => {
    if (!socket) return;
    socket.on("documentUpdated", ({ projectId, code, collaborators }) => {
      setCode(code);
      // setContent({ ...content, collaborators });
    });
  }, [socket, projectId]);

  useEffect(() => {
    if (!socket || !projectId) return;

    socket.once("loadDocument", (doc) => {
      setContent(doc);
      setCode(doc.body);
      setIsReadOnlyEditor(false);
    });
    socket.emit("getDocumentId", projectId);
    return () => {
      socket.off("getDocumentId");
    };
  }, [socket, projectId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  // //see users
  // useEffect(() => {
  //   if (!socket || !projectId) return;

  //   socket.on("room data", (user) => {
  //     console.log(user);
  //     console.log(content)
  //   });
  //   return () => {
  //     socket.off("room data");
  //   };
  // }, [socket, projectId]);
  //---------
  //   const debouncedEmit = useCallback(
  //     debounce((contentID, content) => {
  //       if (!skt) return;
  //       skt.emit("contentEdited", { contentID, content });
  //     }, 800), // Adjust the debounce delay (in milliseconds) as needed
  //     [skt]
  //   );

  //   useEffect(() => {
  //     setSkt(socket);
  //     console.log(socket)
  //     // return () => {
  //     //   skt.disconnect();
  //     // };
  //   }, [socket]);

  //   useEffect(() => {
  //     if (!skt) return;
  //     debouncedEmit(contentID, content);

  //     // Cleanup function to cancel any pending debounced calls if component unmounts or dependencies change
  //     return () => {
  //       debouncedEmit.cancel();
  //     };
  //   }, [skt, content, contentID, debouncedEmit]);
  //   useEffect(() => {
  //     if (!skt) return;
  //     skt.on("contentUpdated", ({ contentID, code }) => {
  //       setContent(code);
  //     });
  //   }, [skt, contentID]);

  //   useEffect(() => {
  //     if (!skt || !contentID) return;

  //     skt.once("loadContent", (doc) => {
  //       setContent(doc);
  //       setIsReadOnlyEditor(false);
  //     });
  //     skt.emit("getContentID", contentID);
  //   }, [skt, contentID]);

  //   const handleCodeChange = (newContent) => {
  //     setContent(newContent);
  //   };

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
    // console.log(cursorPosition);
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
          // enableLiveAutocompletion: true,
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
