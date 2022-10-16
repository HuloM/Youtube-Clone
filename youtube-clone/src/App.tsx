import React from "react";
import "./App.css";
import { Player } from "video-react";
import "../node_modules/video-react/dist/video-react.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <div className="App w-50">
            <Player
                playsInline
                poster="/assets/poster.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
            <Player
                playsInline
                poster="/assets/poster.png"
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
        </div>
    );
}

export default App;
