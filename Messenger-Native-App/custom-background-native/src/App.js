import React from "react";
import BackgroundImage from "react-background-image";
import placeholder from "./images/small.jpg";
import hdImage from "./images/large.jpg";

export default class App extends React.Component {
  render() {
    return (
      <main className="main">
        <BackgroundImage placeholder={placeholder} src={hdImage} />
      </main>
    );
  }
}
