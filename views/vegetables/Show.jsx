const React = require("react");
const DefaultLayout = require("../layouts/DefaultLayout");

class Show extends React.Component {
  render() {
    const { vegetable } = this.props;
    return (
      <DefaultLayout title={"Vegetable Show Page"}>
        The {vegetable.name} is {vegetable.color}.
        {vegetable.readyToEat ? "It is ready to eat" : "It is not ready to eat"}
        <br />
        <a href="/vegetables">List of Vegetables</a>
      </DefaultLayout>
    );
  }
}

module.exports = Show;
