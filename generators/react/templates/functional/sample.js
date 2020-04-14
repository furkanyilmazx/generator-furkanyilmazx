import React, { useState } from "react";

function <%= componentName %>({ name }) {
  const [sample, setSample] = useState("Hello");
<%if (moreSettings && hasUseEffect) { -%>
  useEffect(() => {
    setSample(`${sample} World`);
    console.log("Component will unount");

    return () => {
      console.log("Component will unount");
    };
  }, []);
<% } -%>

  return (
    <div>
      <%= componentName %> {name}
      {sample}
    </div>
  );
}

export default <%= componentName %>;
