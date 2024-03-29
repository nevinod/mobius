import { useEffect, useState } from "react";
import { allImages } from "./images/index";
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
  Input,
  InputRightAddon,
  InputGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

function TopHeader() {
  return (
    <div className="top-header">
      <div className="header">
        <div className="company">{"Mobius AI"}</div>
      </div>
      <Divider orientation="horizontal" />
    </div>
  );
}

function Image({ image, setShowModal, setSelectedImage }) {
  function handleClick() {
    setSelectedImage(image);
    setShowModal((showModal) => !showModal);
  }

  return (
    <div className="image-container" onClick={handleClick}>
      <img className="image" src={image} />
      <div className="middle">
        <div style={{ display: "none" }} className="text">
          Share
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [images, setImages] = useState(allImages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(100);
  const [submitted, setSubmitted] = useState(false);
  const { isOpen } = useDisclosure();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function handleClick() {
    setSubmitted(true);
    setLoading(0);
  }

  function unClick() {
    setShowModal(false);
    setSelectedImage(null);
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
              setImages((images) => [...images.sort(() => Math.random() - 0.5)]);
            }}
          >
            {() => (
              <Form style={{ width: "100%" }}>
                <Field name="name">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>
                        Start with a detailed description...
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          placeholder="Description"
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
            {submitted &&
              images.map((image, idx) => {
                return (
                  <Image
                    image={image}
                    key={idx}
                    isOpen={isOpen}
                    setShowModal={setShowModal}
                    setSelectedImage={setSelectedImage}
                  />
                );
              })}
          </div>
        )}
      </div>
      {selectedImage && (
        <Modal isOpen={showModal} onClick={handleClick} onClose={unClick}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>View Image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <img className="modal-image" src={selectedImage} />
            </ModalBody>
            <ModalFooter>
              <Menu>
                <MenuButton as={Button} rightIcon={"↓"}>
                  Share
                </MenuButton>
                <MenuList>
                  <MenuItem>Twitter</MenuItem>
                  <MenuItem>TikTok</MenuItem>
                  <MenuItem>Instagram</MenuItem>
                  <MenuItem>Email</MenuItem>
                </MenuList>
              </Menu>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ChakraProvider>
  );
}

export default Home;
