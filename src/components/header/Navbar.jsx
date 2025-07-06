"use client";
import {
  NavbarBase,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/Resizable-navbar";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";

function Navbar() {
  const [navItems, setNavItems] = useState([
    { name: "Home", link: "/" },
    { name: "Generate", link: "/generate-readme" },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNavItems([
        { name: "Home", link: `${window.location.origin}` },
        { name: "Generate", link: `${window.location.origin}/generate-readme` },
      ]);
    }
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar-base")?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  return (
    <div className="relative w-full"> {/* Non-static position as required */}
      <NavbarBase className="navbar-base">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" href="https://github.com/Shubham-1068/IntelliDoc"><Github /></NavbarButton>
            {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href={"https://github.com/Shubham-1068/IntelliDoc"}
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                GitHub
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavbarBase>
    </div>
  );
}

export default Navbar;