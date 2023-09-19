const React = require("react");
class Show extends React.Component {
  render() {
    const { vegetables } = this.props;
    return (
      <div>
        <h1> Vegetables Show Page </h1> The {vegetables.name} is{" "}
        {vegetables.color}.
        {vegetables.readyToEat
          ? "It is ready to eat"
          : "It is not ready to eat"}
      </div>
    );
  }
}

module.exports = Show;
