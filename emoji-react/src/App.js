import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function App() {
  return (
    <Editor
      apiKey="1syb9rt143o75guq2re9sc0qhiqb5cbhmfv3fg0wwcjhwvun"
      init={{
        plugins: "emoticons",
        toolbar: "emoticons",
        toolbar_location: "bottom",
        menubar: false,
      }}
    />
  );
}

export default App;