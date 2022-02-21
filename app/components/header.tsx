import TopGunImage from "~/images/top-gun.jpg";

export const Header = () => {
  return (
    <div className="header-container">
      <img className="hero" src={TopGunImage} />
      <h1 className="main-title">The Cruise Strikes Back</h1>
    </div>
  );
};
