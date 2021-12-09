import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "marketing/MarketingApp";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParenteNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathName) history.push(nextPathName);
      },
    });

    history.listen(onParenteNavigate);
  }, []);

  return <div ref={ref} />;
};
