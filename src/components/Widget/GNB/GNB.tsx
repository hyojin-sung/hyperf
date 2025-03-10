"use client";

import { motion } from "framer-motion";
import { MenuButton } from "./Element/MenuButton";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useMenu } from "@/hooks/useMenu";
import classNames from "classnames";
import React, { createRef, useEffect, useState } from "react";

export const headerRef = createRef<HTMLHeadElement>();

export const GNB: React.FC = () => {
  const { data: menus } = useMenu();
  const [isBlackArea, setIsBlackArea] = useState(false);

  useEffect(() => {
    const target = document.getElementById("about");

    if (!target) return;

    const handleScroll = () => {
      const rect = target.getBoundingClientRect();
      if (rect.top <= 125 && rect.bottom >= 120) {
        setIsBlackArea(true);
      } else {
        setIsBlackArea(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.header
      className={classNames("px-5 max-md:h-[90px]")}
      ref={headerRef}
      animate={{
        backgroundColor: isBlackArea ? "#000000" : "#FFFFFF",
        color: isBlackArea ? "#FFFFFF" : "#000000",
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      <div className="md:py-8 py-5 w-full mx-auto max-w-[1300px]">
        <div className="flex items-center gap-5 md:justify-between">
          <div
            className="shrink-0"
            onClick={() => {
              scrollToTop();
            }}
          >
            {isBlackArea ? (
              <CustomImage src="images/logo/logo-white.svg" alt="로고 이미지" />
            ) : (
              <CustomImage src="images/logo/logo-color.svg" alt="로고 이미지" />
            )}
          </div>
          <div className="flex items-center max-w-[839px] justify-between grow h-full pt-3 max-lg:hidden">
            {menus?.map((menu) => (
              <MenuButton
                key={menu.key}
                title={menu.label}
                menuKey={menu.key}
                isBlackArea={isBlackArea}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  );
};
