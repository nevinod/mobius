import { useEffect, useState } from "react";
import { images } from "./images/index";
import { Field, Form, Formik } from "formik";
import "./Home.css";

import {
  Button,
  ChakraProvider,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Input,
  InputRightAddon,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

function TopHeader() {
  return (
    <div>
      <Heading style={{ position: "fixed", left: "20px", top: "20px" }}>
        Mobius AI / Images
      </Heading>
      <Divider orientation="horizontal" />
    </div>
  );
}

function Image({ image, showModal, setShowModal }) {
  console.log(image);
  return (
    <div
      className="image-container"
      onClick={() => setShowModal((showModal) => !showModal)}
    >
      <img className="image" src={image} />
      <div className="middle">
        <div style={{ display: "none" }} className="text">
          Share
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img className="modal-image" src={image} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { isOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setSubmitted(true);
    setLoading(0);
  }

  useEffect(() => {
    setTimeout(() => {
      if (submitted && loading < 100) {
        setLoading((loading) => loading + 20);
      }
    }, 200);
  }, [loading, submitted]);

  return (
    <ChakraProvider>
      <div className="container">
        <TopHeader />
        <div className="input-container">
          <Formik
            initialValues={{ name: "" }}
            onSubmit={() => {
              setSubmitted(true);
              setLoading(0);
            }}
          >
            {() => (
              <Form style={{ width: "100%" }}>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel>
                        Start with a detailed description...
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          placeholder="name"
                          variant="flushed"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                        />
                        <InputRightAddon
                          onClick={handleClick}
                          children="Generate"
                          style={{ cursor: "pointer" }}
                        />
                      </InputGroup>
                      <FormHelperText>
                        Or upload an image to edit
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
        </div>
        {loading > 0 && loading < 100 && <CircularProgress value={loading} />}
        {loading >= 100 && (
          <div className="home">
            {images.map((image, idx) => {
              return (
                <Image
                  image={image}
                  key={idx}
                  isOpen={isOpen}
                  onClose={onClose}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              );
            })}
          </div>
        )}
      </div>
    </ChakraProvider>
  );
}

export default Home;
