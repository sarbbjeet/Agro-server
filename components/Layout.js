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
  return (
    <div {...props} className="overflow-hidden h-full">
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
