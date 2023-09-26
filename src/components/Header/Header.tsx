import styles from "./Header.module.sass";
import Logo from "../../assets/logo_sph_piscinas.png";
import React, { EventHandler } from "react";
import Burger from "../../assets/icons8-cardápio.svg";

const Header = () => {
  const [visible, setVisible] = React.useState<boolean>();
  const headerRef = React.useRef<HTMLHeadElement>(null);

  React.useEffect(() => {
    function handleMenu(event: Event) {
      if (event.target && !headerRef.current?.contains(event.target as Node)) {
        setVisible(false);
      }
    }

    const events = ["click", "scroll"];
    events.forEach((e) => {
      document.addEventListener(e, handleMenu);
    });

    return () => {
      document.removeEventListener("click", handleMenu);
    };
  }, [visible]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.logo}>
        <img src={Logo} /> SPH Piscinas
      </div>
      <div
        className={styles.menu_controller}
        onClick={() => setVisible(!visible)}
      >
        <img src={Burger} alt="" />
      </div>
      <nav className={visible ? styles.active : ""}>
        {["sobre", "serviços", "depoimentos", "contato"].map((item) => {
          // ! Criar função para remover caracteres especiais
          return (
            <a key={item} href={`#${item.replace(/[ç]/g, "c").toLowerCase()}`}>
              {item}
            </a>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
