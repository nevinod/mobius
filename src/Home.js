import { useEffect, useState } from "react";
import { images } from "./images/index";
import { ChakraProvider, Button } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import "./Home.css";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Progress,
} from "@chakra-ui/react";

function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  console.log(loading);

  useEffect(() => {
    setTimeout(() => {
      if (submitted && loading < 100) {
        setLoading((loading) => loading + 20);
      }
    }, 200);
  }, [loading, submitted]);

  console.log(loading);

  return (
    <ChakraProvider>
      <div className="container">
        <div className="input-container">
          <Formik
            initialValues={{ name: "" }}
            onSubmit={() => {
              console.log(input);
              setSubmitted(true);
              setLoading(0);
            }}
          >
            {() => (
              <Form style={{ width: "100%" }}>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel>Enter a description here...</FormLabel>
                      <Input
                        {...field}
                        placeholder="name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <FormHelperText>Any text you want</FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
        </div>
        <Progress value={80} />
        {submitted && <h2>{`Results for ${input}`}</h2>}
        {loading > 0 && loading < 100 && <Progress value={loading} />}
        {loading >= 100 && (
          <div className="home">
            {images.map((image, idx) => {
              return (
                <div className="image-container" key={`${idx}`}>
                  <img className="image" src={image} />
                  <div className="middle">
                    <div style={{ display: "none" }} className="text">
                      Share
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ChakraProvider>
  );
}

export default Home;
