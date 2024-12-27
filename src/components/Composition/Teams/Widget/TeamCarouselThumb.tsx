import { GeneralButton } from "@/components/UI/Button/GeneralButton";

import { TeamItem } from "@/hooks/useTeams";
import { Image } from "@nextui-org/react";
import React, { useState } from "react";

type PropType = {
  selected: boolean;
  team: TeamItem;
  onClick: () => void;
  style?: React.CSSProperties;
};

export const TeamCarouselThumb: React.FC<PropType> = (props) => {
  const { selected, team, onClick, style } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={"embla-thumbs__slide md:h-[200px] cursor-pointer".concat(
        selected ? " embla-thumbs__slide--selected" : "",
      )}
      style={style}
    >
      <GeneralButton
        onClick={onClick}
        type="button"
        className="md:w-[200px] md:h-[200px] w-[152px] h-[152px] px-0 rounded-none cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Image
          src={
            selected
              ? team.activeImage
              : isHover
              ? team.hoverImage
              : team.defaultImage
          }
          alt={team.name}
          className="rounded-none cursor-pointer aspect-square object-fill "
        />
      </GeneralButton>
    </div>
  );
};
