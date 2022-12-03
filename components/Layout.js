import React, { useState } from "react";
import AppHead from "../components/Head";
import Header from "../components/Header";
import AppFooter from "../components/AppFooter";
import { colors } from "../utils/constants";
import styled from "styled-components";
import { f2 as ff } from "../styles/variables.module.scss";
import Image from "next/image";
import Chat from "./chat/Chat";
import ChatProvider from "../context/ChatProvider";
import { useAppModel } from "../context/AppModelProvider";

const Div = styled.div`
  background-color: ${(props) => props.color};
  padding: 100px;
  @media (max-width: 768px) {
    background-color: #ff0000;
  }
`;

const Input = styled.input.attrs((props) => ({
  placeholder: "email address",
}))``;

export default function Layout({ children, ...props }) {
  const { stopScrolling } = useAppModel();
  return (
    // <div {...props}>
    // cover your code wiith className="overflow-hidden  h-screen" to stop scrolling under model
    <div {...props} className={stopScrolling && `overflow-hidden  h-screen`}>
      <AppHead />
      <Header />
      <ChatProvider>
        <Chat />
      </ChatProvider>
      {children}
      <AppFooter />
    </div>
  );
}
