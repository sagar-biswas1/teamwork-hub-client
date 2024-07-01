import React, { useCallback, useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools"; // Optional: enable auto-completion
import "ace-builds/src-noconflict/ext-searchbox"; // Optional: enable search box
import { debounce } from "lodash";

import { useAuthContext } from "../context/AuthContext";
import useSocket from "../socket";

const CodeEditor = ({ projectId }) => {
  const { authUser } = useAuthContext();
  const socket = useSocket(authUser?._id);

  const [code, setCode] = useState("loading codes...");
  const [cursors, setCursors] = useState({});
  const [isReadOnlyEditor, setIsReadOnlyEditor] = useState(true);
  const [content, setContent] = useState({});

  const debouncedEmit = useCallback(
    debounce(({ projectId, code, userId, creatorId }) => {
      if (!socket) return;

      const payLoad = { projectId, code, collaborators: [] };
      if (userId !== creatorId) {
        payLoad.collaborators = [userId];
      }

      socket.emit("documentEdited", payLoad);
    }, 1000),
    [socket]
  );

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

  // const handleCursorPositionChange = (selection) => {
  //   const cursorPosition = {
  //     row: selection.getCursor().row,
  //     column: selection.getCursor().column,
  //   };

  // };

  return (
    <div className="flex justify-center">
      <AceEditor
        mode="javascript"
        theme="solarized_light"
        value={code}
        onChange={handleCodeChange}
        // onCursorChange={handleCursorPositionChange}
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
    </div>
  );
};

export default CodeEditor;
