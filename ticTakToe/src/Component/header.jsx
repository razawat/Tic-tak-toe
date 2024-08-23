import headerImg from "../../public/game-logo.png";

export default function Header() {
  return (
    <header id="header">
      <img src={headerImg} alt="header" />
      <h1>TIC-TAC-TOE</h1>
    </header>
  );
}
