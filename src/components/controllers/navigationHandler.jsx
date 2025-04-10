import { useEffect, useState } from "react";
import useStateStore from "../../stores/stateStore";
import useUIStore from "../../stores/UIStore";
import { gsap } from "gsap";
import { CameraPositions } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
// Available states: "landing", "houseScene", "polaroid", "zoomed"

export default function navigationHandler(getRefsForState) {
  const { currentState, popState, pushState } = useStateStore();
  const {
    isLandingPageVisible,
    setIsLandingPageVisible,
    isNightMode,
    setCameraAnimation,
    setIsCursorTextVisible,
    setIsZoomedIn,
    setFromPolaroid,
  } = useUIStore();
  const navigate = useNavigate();

  const handleEnterNavigationState = (state) => {
    const validStates = ["houseScene", "focusedView", "polaroid"];
    if (!validStates.includes(state)) {
      console.error(`Invalid state: ${state}`);
      return;
    }

    pushState(state);

    switch (state) {
      case "houseScene":
        enterHouseScene();
        break;
      case "focusedView":
        setIsZoomedIn(true);
        break;
      case "polaroid":
        enterPolaroid();
        break;
    }

    console.log(`Entering state: ${state} from ${currentState}`);
  };

  const handleExitNavigationState = () => {
    const prevState = currentState;
    popState();

    switch (prevState) {
      case "houseScene":
        exitHouseScene();
        break;
      case "focusedView":
        setCameraAnimation(CameraPositions.FOCUSED_VIEW);
        setIsZoomedIn(false);
        break;
      case "polaroid":
        exitPolaroid();
        break;
    }

    console.log(`Exiting state: ${prevState}`);
  };

  const enterHouseScene = () => {
    const { houseWrapperRef, contentRef } = getRefsForState("houseScene");
    setIsCursorTextVisible(false);
    setCameraAnimation(CameraPositions.HOUSE_SCENE);

    gsap.to(contentRef.current, {
      scale: 10,
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        setIsLandingPageVisible(false);
        gsap.to(houseWrapperRef.current, {
          backdropFilter: "blur(0px)",
          duration: 0.5,
        });
      },
    });
  };

  const exitHouseScene = () => {
    const { houseWrapperRef, contentRef } = getRefsForState("houseScene");
    setFromPolaroid(false);
    setCameraAnimation(CameraPositions.LANDING_PAGE);
    setIsCursorTextVisible(true);
    setIsLandingPageVisible(true);
    requestAnimationFrame(() => {
      gsap.to(houseWrapperRef.current, {
        backdropFilter: "blur(40px)",
        duration: 0.5,
      });

      gsap.fromTo(
        contentRef.current,
        { scale: 10, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );
    });
  };

  const enterPolaroid = () => {
    navigate("/polaroid");
  };

  const exitPolaroid = () => {
    setFromPolaroid(true);
    navigate("/");
  };

  const enterProjects = () => {};

  const exitProjects = () => {};

  // If there is no previous state, set the current state to the first state? or maybe set to the zoomed in house state
  // For example, reloading on /polaroid/ would have no previous state i think

  return {
    handleEnterNavigationState,
    handleExitNavigationState,
  };
}
