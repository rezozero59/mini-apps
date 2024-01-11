import { configureStore } from "@reduxjs/toolkit";
import tabs from "./components/Ide/features/tabs";
import preview from "./components/Ide/features/preview";
import chrono from "./components/Pomodoro/features/chrono";

export const store = configureStore({
  reducer: {
    tabs,
    preview,
    chrono,
  },
});
