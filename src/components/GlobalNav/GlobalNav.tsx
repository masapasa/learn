import { View, Flex } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import styles from "./GlobalNav.module.scss";
import { NavMenuIconType } from "./components/icons/IconLink";
import { RightNavLinks } from "./components/RightNavLinks";
import { AmplifyNavLink } from "./components/AmplifyNavLink";
import { LeftNavLinks } from "./components/LeftNavLinks";
import { SecondaryNav } from "./components/SecondaryNav";

export enum NavMenuItemType {
  DEFAULT = "DEFAULT",
  EXTERNAL = "EXTERNAL",
  ICON = "ICON",
}

export interface NavMenuItem {
  type: NavMenuItemType;
  label: string;
  url: string;
  order: number;
  icon?: NavMenuIconType | string;
}

export interface NavProps {
  leftLinks: NavMenuItem[];
  rightLinks: NavMenuItem[];
  socialLinks: NavMenuItem[];
  currentSite: string;
  secondaryNavDesktop: JSX.Element;
  secondaryNavMobile: JSX.Element;
}

export function GlobalNav({
  currentSite,
  leftLinks,
  rightLinks,
  socialLinks,
  secondaryNavDesktop,
  secondaryNavMobile,
}: NavProps) {
  const themeableSites: any = {
    "UI Library": true,
  };

  // This class will be added onto the sites that aren't using an Amplify UI theme provider, this will let those using a ThemeProvider use the variables
  // provided and the sites not using a ThemeProvider will have the needed variables added on
  const themeClass = themeableSites[currentSite] ? "" : "use-ui-theme";

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showSecondaryNav, setShowSecondaryNav] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 975px)");

    // Handle the changes when switching between the breakpoint
    // so that the secondary nav only shows when on the mobile dev center nav
    const eventListener = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setShowSecondaryNav(false);
      } else {
        setShowSecondaryNav(true);
      }
    };

    // Check on first load to see if on mobile dev center
    if (mediaQuery.matches) {
      // Always show the secondary nav if so
      setShowSecondaryNav(false);
    }

    mediaQuery.addEventListener("change", eventListener);

    return () => mediaQuery.removeEventListener("change", eventListener);
  }, []);

  return (
    <View
      as="nav"
      className={styles["navbar"]}
      aria-label="Amplify Dev Center - External links to additional Amplify resources"
    >
      <View
        className={`${styles["dev-center-navbar"]} ${
          themeClass ? styles[themeClass] : ""
        }`}
      >
        <Flex
          style={{ display: showSecondaryNav ? "none" : "flex" }}
          className={styles["nav-links-container"]}
        >
          <Flex
            height="100%"
            id="left-nav"
            className={styles["left-nav-links"]}
          >
            <AmplifyNavLink
              currentSite={currentSite}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <LeftNavLinks
              isCollapsed={isCollapsed}
              leftLinks={leftLinks}
              currentSite={currentSite}
              showSecondaryNav={showSecondaryNav}
              setShowSecondaryNav={setShowSecondaryNav}
            />
          </Flex>
          <RightNavLinks
            rightLinks={rightLinks}
            socialLinks={socialLinks}
            currentSite={currentSite}
            isCollapsed={isCollapsed}
          />
        </Flex>
        <SecondaryNav
          currentSite={currentSite}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          showSecondaryNav={showSecondaryNav}
          setShowSecondaryNav={setShowSecondaryNav}
          secondaryNavMobile={secondaryNavMobile}
        />
        <View
          className={isCollapsed ? "" : styles["background-overlay"]}
          onClick={() => {
            setIsCollapsed(true);
          }}
        ></View>
      </View>
      <View className={styles["secondary-nav"]}>{secondaryNavDesktop}</View>
    </View>
  );
}
