const React = require("react");
const DefaultLayout = require("../layouts/DefaultLayout");

class Show extends React.Component {
  render() {
    const { fruit } = this.props;
    return (
      <DefaultLayout title={"Fruits Show Page "}>
        The {fruit.name} is {fruit.color}.
        {fruit.readyToEat ? "It is ready to eat" : "It is not ready to eat"}
        <br />
        <a href="/fruits">List of Fruits</a>
      </DefaultLayout>
    );
  }
}
module.exports = Show;
