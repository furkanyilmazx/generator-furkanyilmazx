import React, { Component } from "react";

class <%= componentName %> extends Component {
  state = {
    sample: "Hello"
  };
<%if (moreSettings && hasShouldComponentUpdate) { -%>

  shouldComponentUpdate() {
    console.log("<%= componentName %> shouldComponentUpdate");
    return true;
  }
<% } -%>
<%if (moreSettings && hasComponentDidMount) { -%>

  componentDidMount() {
    console.log("<%= componentName %> componentDidMount ");
  }
<% } -%>
<%if (moreSettings && hasComponentWillUnmount) { -%>

  componentWillUnmount() {
    console.log("<%= componentName %> componentDidMount ");
  }
<% } -%>

  render() {
    const { name } = this.props;
    const { sample } = this.state;

    return (
      <div>
         <%= componentName %> {name}
        {sample}
      </div>
    );
  }
}

export default <%= componentName %>;
