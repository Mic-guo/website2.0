import { useState } from "react";
import useStateStore from "../stores/stateStore";

export default function navigationHandler() {
  const [currentState, setCurrentState] = useState(null);
  const { getCurrentState, popState, pushState } = useStateStore();

  const handleNavigation = (state) => {
    pushState(state);
  };
}
