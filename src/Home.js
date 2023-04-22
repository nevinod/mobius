import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { images } from "./images/index";
import { ChakraProvider } from "@chakra-ui/react";
import "./Home.css";

function Home() {
  const [input, setInput] = useState("");

  console.log(input);
  return (
    <ChakraProvider>
      <div className="container">
        <div className="input-container">
          <Input
            placeholder="Enter a description here..."
            size="lg"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="home">
          {images.map((image, idx) => {
            return (
              <div className="image-container" key={`${idx}`}>
                <img className="image" src={image} />
              </div>
            );
          })}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default Home;
