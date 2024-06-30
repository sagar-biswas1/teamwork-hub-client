import React, { useRef, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import Feedbacks from "../components/Feedbacks/Feedbacks";
import Chats from "../components/Chats/Chats";
import { useParams } from "react-router-dom";

const CollaborativeEditor = () => {
  const {projectId}= useParams()

  return (
    <div className="bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap -mx-3">
          {/* Document Editor and Feedback */}
          <div className="w-full lg:w-3/4 px-3 mb-6">
            {/* Document Editor */}
            <div className=" bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Edit Document
              </h2>
              <div className="editor-container" id="editor">
                <CodeEditor projectId={projectId}/>
              </div>
            </div>

            {/* Feedback Section */}
            <Feedbacks />
          </div>

          {/* Real-Time Collaboration and Chat */}
          <div className="w-full lg:w-1/4 px-3 mb-6">

          <Chats/>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default CollaborativeEditor;
